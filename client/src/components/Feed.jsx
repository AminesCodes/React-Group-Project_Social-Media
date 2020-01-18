/*
Feed Container Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import './Feed.css';

import PostCard from './PostCard';
import CommentCard from './CommentCard'


export default class Feed extends PureComponent {
  pw = sessionStorage.getItem('Suit_App_KS');
  // uId = sessionStorage.getItem('Suit_App_UId');
  state = {
    posts: []
  }

  async componentDidMount() {
    // console.log("componentDidMount ran");
    await this.getFeed();
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate ran");
    const arePathnamesSame = this.props.location.pathname === prevProps.location.pathname;
    const areSearchesSame = this.props.location.search === prevProps.location.search;
    if (!arePathnamesSame || !areSearchesSame) {
      // console.log("RERUNNING GETFEED");
      await this.getFeed();
    }
  }

  getSearches = () => {
      let process = new URLSearchParams(this.props.location.search);
      const string = process.get("search");
      // console.log("searchCheck: ", string);
      return string;
  }

  getFeed = async () => {
    let url = 'http://localhost:3129/posts/';             // location parse begins at global feed
    const pathname = this.props.location.pathname;
    const searchString = this.getSearches();
    if (!pathname.includes("all")) {                      // switch to follows feed
      url += `follows/${this.props.userId}`;
    } else if (searchString) {                            // switch to hashtags feed
      url += `tags/?hashtags=${searchString}`;
    }
    const response = await axios.get(url);
    const postsArray = response.data.payload;
    this.setState((prevState, props) => {
        return {posts: postsArray}
    });
  }

  // ############## RENDER ################
  render() {
    // console.log("render ran, posts: ", this.state.posts);

    const postsList = this.state.posts.map(post => {

        // CREATE COMMENTS
        let commentsAttachment = []
        if (post.comments) {
          commentsAttachment = post.comments.map(comment => {
              return (
                <CommentCard 
                  key={post.id + comment.username + comment.comment_id} 
                  commentId={comment.comment_id} 
                  avatar={comment.avatar_url} 
                  username={comment.username} 
                  comment={comment.comment_body} 
                  timestamp={comment.time_created} 
                  userId={Number(this.uId)} 
                  commenterId={comment.commenter_id} 
                  // postId={this.props.postId} 
                  // reloadComments={this.props.reloadComments} 
                />
              );
          });
        }

        // CREATE HASHTAGS COMPONENTS
        let tagData = post.hashtag_str;
        let hashtags = tagData.split('#');
        hashtags = hashtags.filter(el => !!el).map((tag, index) => {
            return (
              <Link 
                key={post.id + tag + `-i${index}`} 
                to={`/${this.props.username}/feed/all?search=${tag}`} 
                className="j-post-hashtag-link" 
              >
                {'#' + tag}
              </Link>
            );
        });

        // CREATE DYNAMIC POST WIDTH ON EMPTY TEXTS PROP
        const calcedImgStyle = { marginRight: (!post.title && !post.caption) ? "auto" : false };
        const calcedGridStyle = { gridTemplateColumns: (!post.title && !post.caption) ? "190px min-content" : "373px min-content" };

        // FORMAT TIMESTAMP PROP
        const timestamp = new Date(post.time_created);

        return(
            <PostCard
              key={post.id} 
              postId={post.id} 
              username={post.username} 
              avatar_url={post.avatar_url} 
              image_url={post.image_url} 
              title={post.title} 
              caption={post.caption} 
              hashtags={hashtags} 
              time_created={timestamp.toLocaleString()} 

              imgStyle={calcedImgStyle} 
              gridStyle={calcedGridStyle} 

              comments={commentsAttachment} 

              handleClickHashtag={this.handleClickHashtag} 
            />
        );
    });

    return (
      <>
        {postsList}
      </>
    )
  }
}
