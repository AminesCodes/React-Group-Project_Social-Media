/*
PostCard Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React from 'react';

import './PostCard.css';


export default function PostCard(props) {
  return(
    <li className="j-post-card">
      {props.username}
      {props.caption}
      {props.hashtag_str}
      {props.id}
      {props.image_url}
      {props.time_created}
    </li>
  );
}
