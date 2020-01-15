/*
Feed Container Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { useLocation } from 'react-router-dom';
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
    console.log("componentDidMount");
    await this.getFeed();
  }

  async componentDidUpdate(prevProps,prevState) {
    console.log("componentDidUpdate");
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("RELOAD", this.props.match.isExact);
      await this.getFeed();
    }
  }

  getSearches = () => {
      let process = new URLSearchParams(this.props.location.search);
      return process.get("search");
  }

  getFeed = async () => {
    let url = 'http://localhost:3129/posts/';
    const pathname = this.props.location.pathname;
    const searchString = this.getSearches();
    if (!pathname.includes("all")) {
      url += `follows/${this.uId}`;
    } else if (searchString) {
      url += `tags/?hashtags=${searchString}`;
    }
    const response = await axios.get(url);
    this.setState((prevState, props) => {
        return {posts: response.data.payload}
    });
  }

  // ############## RENDER ################
  render() {
    console.log("render, posts: ", this.state.posts);
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
