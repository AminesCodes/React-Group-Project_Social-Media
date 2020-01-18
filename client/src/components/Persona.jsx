/*
Persona Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

// import './Persona.css';

import PersonalPosts from './PersonalPosts'
import Avatar from './Avatar'


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleNetworkErrors = err => {
    if (err.response) {
        if (err.response.data.message) {
            toast.error(err.response.data.message,
                { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error(`${err.response.data}: ${err.response.status} - ${err.response.statusText}`,
            { position: toast.POSITION.TOP_CENTER });
            console.log('Error', err);
        }
    } else if (err.message) {
        toast.error(err.message,
            { position: toast.POSITION.TOP_CENTER });
    } else {
        toast.error('Sorry, an error occurred, try again later',
            { position: toast.POSITION.TOP_CENTER });
        console.log('Error', err);
    }
}

export default class Persona extends Component {
  state = {
    userId: 0,
    username: '',
    avatar: '',
    bio: '',
    followers: [],
    newPost: null,
    title: '',
    caption: '',
  }

  getUserInfo = async (url) => {
    try {
      const targetUser = url.split('/')[1]
      const {data} = await axios.get(`http://localhost:3129/users/${targetUser}`)  //GET THE USER INFO
      this.setState({
        userId: data.payload.id,
        username: data.payload.username,
        avatar: data.payload.avatar_url,
        bio: data.payload.bio,
      })

      const response = await axios.get(`http://localhost:3129/follows/followers/${data.payload.id}`)

      const allFollowers = response.data.payload
      const randomIndexes = []
      this.getRandomFollowers(randomIndexes, 3, {}, allFollowers.length)
      const randomFollows = randomIndexes.map(num => allFollowers[num])
      this.setState({
        followers: randomFollows,
      })
    } catch (err) {
      handleNetworkErrors(err)
    }
  }

  async componentDidMount() {
    await this.getUserInfo(this.props.match.url)
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.url !== this.props.match.url) {
      await this.getUserInfo(nextProps.match.url)
      return true
    }
    // return nextProps.match.url !== this.props.match.url
    return false
  }

  getRandomFollowers = (arr, num, tracker, max) => {
    const randomId = Math.floor(Math.random() * max)
    if (arr.length === num) {
      return
    }
    if (tracker[randomId]) {
      this.getRandomFollowers(arr, num, tracker, max)
    } else {
      tracker[randomId] = true
      arr.push(randomId)
      this.getRandomFollowers(arr, num, tracker, max)
    }
  }
  
  // ################ RENDER ###########
  render() {
    const uId = sessionStorage.getItem('Parent-Ing_App_UId')
    const imgAvatar = require('../assets/images/avatars/2.png')
    return (
      <div className='container-fluid m-3'>
        <div className='row' >
            <div className='col-sm-2'>
                <Avatar avatar={this.state.avatar}/>
            </div>
            <div className='col-sm-7'>
                <p>{this.state.bio}</p>
            </div>
            <div className='col-sm-3'>
                <div className='d-flex flex-wrap m-0 p-0'>
                  {this.state.followers.map(user => 
                    <div className='flex-fill m-0 p-0' key={user.follower+user.avatar_url}>
                      <Link to={`/${user.follower}/persona`}>
                        <img className='squareAvatar m-0 p-0' src={user.avatar_url || imgAvatar} alt='profile avatar'></img>
                      </Link>
                    </div>)}   
                </div>
            </div>
        </div>
        <PersonalPosts className='row' userId={this.state.userId} allowedToEdit={this.state.userId+'' === uId+''} active={true}/>
   </div>
    );
  }
}
