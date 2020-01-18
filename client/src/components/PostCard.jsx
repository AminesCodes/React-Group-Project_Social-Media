/*
PostCard Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React from 'react';

import './PostCard.css';

const iconLike = require("../assets/images/reactions/like.png");
const iconComment = require("../assets/images/reactions/comment.png");


export default function PostCard(props) {
  return(
    <li className="j-post-card">
      <div className="j-post-userbox">
        <h6 className="j-post-username j-shadow">{props.username}</h6>
        <img className="j-post-avatar j-shadow" src={props.avatar_url} alt="Avatar" />
      </div>

      <div className="j-post-grid" style={props.gridStyle}>

        <div className="j-reaction-hold">
          <img src={iconLike} className="j-reaction-icon" alt="likes" />11
          <img src={iconComment} className="j-reaction-icon" alt="comments" />22
        </div>
        <div className="j-post-image-box">
          <img className="j-post-image j-shadow" src={props.image_url} style={props.imgStyle} alt="Post" />
        </div>
        <div className="j-post-banner-box">
          <h3 className="j-post-title">{props.title}</h3>
        </div>
        <p className="j-post-caption">{props.caption}</p>
        <div className="j-post-hashtags-box">
          <div className="j-post-hashtags-hr" />
          <div className="j-hash-date-line">
            <div className="j-post-hashtags">
              {props.hashtags}
            </div>
            <p className="j-post-date">{props.time_created}</p>
          </div>
          <div className="j-post-hashtags-hr" style={{ display: props.comments.length ? "block" : "none" }} />
        </div>
      </div>
      {props.comments}
    </li>
  );
}
