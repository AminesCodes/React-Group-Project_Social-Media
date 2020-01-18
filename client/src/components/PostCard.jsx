/*
PostCard Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';

import './PostCard.css';

import CommentCard from './CommentCard'

const iconLike = require("../assets/images/reactions/like.png");
const iconComment = require("../assets/images/reactions/comment.png");


export default class PostCard extends PureComponent {
  pw = sessionStorage.getItem('Suit_App_KS');
  // uId = sessionStorage.getItem('Suit_App_UId');
  state = {

  }

  render() {
    const {
      id,
      username,
      avatar_url,
      image_url,
      title,
      caption,
      hashtags,
      time_created
    } = this.props;

    return(
      <li className="j-post-card">
        <div className="j-post-userbox">
          <h6 className="j-post-username j-shadow">{username}</h6>
          <img className="j-post-avatar j-shadow" src={avatar_url} alt="Avatar" />
        </div>

        <div className="j-post-grid" style={this.props.gridStyle}>

          <div className="j-reaction-hold">
            <img src={iconLike} className="j-reaction-icon" alt="likes" />11
            <img src={iconComment} className="j-reaction-icon" alt="comments" />22
          </div>
          <div className="j-post-image-box">
            <img className="j-post-image j-shadow" src={image_url} style={this.props.imgStyle} alt="Post" />
          </div>
          <div className="j-post-banner-box">
            <h3 className="j-post-title">{title}</h3>
          </div>
          <p className="j-post-caption">{caption}</p>
          <div className="j-post-hashtags-box">
            <div className="j-post-hashtags-hr" />
            <div className="j-hash-date-line">
              <div className="j-post-hashtags">
                {hashtags}
              </div>
              <p className="j-post-date">{time_created}</p>
            </div>
            <div className="j-post-hashtags-hr" style={{ display: this.props.comments.length ? "block" : "none" }} />
          </div>
        </div>
        {this.props.comments}
      </li>
    );
  }
}
