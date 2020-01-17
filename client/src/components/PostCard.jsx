/*
PostCard Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React from 'react';

import './PostCard.css';


export default function PostCard(props) {
  return(
    <li className="j-post-card">
      <div className="j-post-userbox">
        <h6 className="j-post--username j-shadow">{props.username}</h6>
        <img className="j-post--avatar j-shadow" src={props.avatar_url} alt="Avatar" />
      </div>

      <div className="j-post-grid" style={props.gridStyle}>

        <div className="reactionHold"></div>
        <div className="j-post--postimg-box">
          <img className="j-post--postimg j-shadow" src={props.image_url} style={props.imgStyle} alt="Post" />
        </div>
        <div className="j-post-banner-box">
          {/* <div className="j-post-hashtags-hr">T</div> */}
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
