/*
PostCard Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import axios from 'axios';

import './PostCard.css';

import CommentCard from './CommentCard'

const iconLike = require("../assets/images/reactions/like.png");
const iconComment = require("../assets/images/reactions/comment.png");


export default class PostCard extends PureComponent {
  state = {
    comments: [],
    reactions: [],
    areCommentsVisible: false
  }

  async componentDidMount() {
    // console.log("componentDidMount ran");
    await this.getCommentsAndReactions();
  }

  getCommentsAndReactions = async () => {
    const [ commentsResponse, reactionsResponse ] = await Promise.all([
      await axios.get(`http://localhost:3129/comments/${this.props.postId}`),
      await axios.get(`http://localhost:3129/reactions/post/all/${this.props.postId}`)
    ]);
    const comments = commentsResponse.data.payload;
    const reactions = reactionsResponse.data.payload;
    this.setState((prevState, props) => {
        return { comments: comments, reactions: reactions }
    });
  }

  handleShowClick = () => {
    this.setState((prevState, props) => {
      return { areCommentsVisible: !this.state.areCommentsVisible }
    });
  }

  render() {
    // const pw = sessionStorage.getItem('Suit_App_KS');
    const uId = sessionStorage.getItem('Suit_App_UId');

    const {
      username,
      avatar_url,
      image_url,
      title,
      caption,
      hashtags,
      time_created
    } = this.props;
    const { comments, areCommentsVisible } = this.state;

    const showButtonStyle = { color: areCommentsVisible ? "#ccc" : "#7d698d" };

    const commentsList = comments.map(comment => {
        return (
          <CommentCard 
            key={this.props.postId + comment.username + comment.comment_id} 
            commentId={comment.comment_id} 
            avatar={comment.avatar_url} 
            username={comment.username} 
            comment={comment.comment_body} 
            timestamp={comment.time_created} 
            userId={Number(uId)} 
            commenterId={comment.commenter_id} 
            // postId={this.props.postId} 
            // reloadComments={this.props.reloadComments} 
          />
        );
    })

    return(
      <li className="j-post-card">
        <div className="j-post-userbox">
          <h6 className="j-post-username j-shadow">{username}</h6>
          <img className="j-post-avatar j-shadow" src={avatar_url} alt="Avatar" />
        </div>

        <div className="j-post-grid" style={this.props.gridStyle}>

          <div className="j-reaction-hold">
            <img src={iconLike} className="j-reaction-icon" alt="likes" />{this.state.reactions.length}
            <img src={iconComment} className="j-reaction-icon" alt="comments" onClick={this.handleShowClick} />{this.state.comments.length}
          </div>
          <div className="j-post-image-box">
            <img className="j-post-image j-shadow" src={image_url} style={this.props.imgStyle} alt="Post" />
          </div>
          <div className="j-post-banner-box">
            <h3 className="j-post-title">{title}</h3>
          </div>
          <p className="j-post-caption">{caption}</p>
        </div>

        <div className="j-post-hashtags-box">
          <div className="j-post-hr" />
          <div className="j-hash-date-line">
            <div className="j-post-hashtags">
              {hashtags}
            </div>
            <p className="j-post-date">{time_created}</p>
          </div>
        </div>

        {/* // <button 
        //   className="j-post-show-comments-btn" 
        //   style={showButtonStyle} 
        //   onClick={this.handleShowClick}
        // >Show Comments</button> */}

        <div className="j-post-comments-box" style={{ display: areCommentsVisible ? "block" : "none" }}>
          <div className="j-post-hr" style={{ display: areCommentsVisible ? "block" : "none" }} />
          {commentsList}
        </div>
      </li>
    );
  }
}
