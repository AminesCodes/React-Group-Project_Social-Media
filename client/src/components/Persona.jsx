/*
Persona Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import axios from 'axios'
// import { Link } from 'react-router-dom';

// import './Persona.css';


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

export default class Persona extends PureComponent {
  // pw = sessionStorage.getItem('Parent-Ing_App_KS');
  // uId = sessionStorage.getItem('Parent-Ing_App_UId');
  state = {
    userId: 0,
    username: '',
    avatar: '',
    bio: '',
    posts: [],
    followers: [],
    newPost: null,
    title: '',
    caption: '',
  }

  async componentDidMount() {
    try {
      const targetUser = this.props.match.url.split('/')[1]
      const {data} = await axios.get(`http://localhost:3129/users/${targetUser}`)  //GET THE USER INFO
      console.log(data)
      this.setState({
        userId: data.payload.id,
        username: data.payload.username,
        avatar: data.payload.avatar_url,
        bio: data.payload.bio,
      })

      const promises = []
      promises.push(axios.get(`http://localhost:3129/posts/userid/${data.payload.id}`))
      promises.push(axios.get(`http://localhost:3129/follows/followers/${data.payload.id}`))
      const response = await Promise.all(promises)

      const allFollowers = response[1].data.payload
      const randomIndexes = []
      this.getRandomFollowers(randomIndexes, 3, {}, allFollowers.length)
      const randomFollows = randomIndexes.map(num => allFollowers[num])
      // console.log(randomFollows)
      this.setState({
        posts: response[0].data.payload,
        followers: randomFollows,
      })
    } catch (err) {
      handleNetworkErrors(err)
    }
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
    // console.log(this.props)
    // console.log(this.state.targetUsername)
    let myDisplay = null
    if (this.state.followers.length) {
      console.log(this.state.followers[0].follower)
      
    }
    return (
      <div className='container-fluid'>
        {this.state.followers.map(user => <p>{user.follower}</p>)}
   </div>
    );
  }
}
