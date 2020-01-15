/*
Feed Container Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
// import { NavLink, Link, Route } from 'react-router-dom';
import axios from 'axios';

// import './Feed.css';

import PostCard from './PostCard';


export default class Feed extends PureComponent {
  pw = sessionStorage.getItem('Parent-Ing_App_KS');
  uId = sessionStorage.getItem('Parent-Ing_App_UId');
  state = {
    posts: []
  }

  async componentDidMount() {
    const url = 'http://localhost:3129/posts/';
    const response = await axios.get(url);
    const joined = this.state.posts.concat(response.data.payload);
    this.setState({
        posts: joined
    });
  }

  // ############## RENDER ################
  render() {

    const postsList = this.state.posts.map(post => {
        return(
            <PostCard
              key={post.id} 
              username={post.username} 
              caption={post.caption} 
              hashtag_str={post.hashtag_str} 
              id={post.id} 
              image_url={post.image_url} 
              time_created={post.time_created}
            />
        );
    });

    return (
      <>
        <p>FEED | Home page: {this.pw}, {this.uId}</p>
        {postsList}
      </>
    )
  }
}
