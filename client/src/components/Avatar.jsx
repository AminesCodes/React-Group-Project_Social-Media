import React from 'react';

const imgAvatar = require('../assets/images/avatars/2.png');


export default function Avatar(props) {
    let avatarImage = 
        <div className='avatarDiv'>
            <img className='avatarImage' src={props.avatarUrl || imgAvatar} alt='profile avatar'></img>
        </div>
    if (props.avatar) {
        avatarImage = 
            <div className='avatarDiv'>
                <img className='avatarImage' src={props.avatar}    alt='profile avatar'></img>
            </div>
    }

    return avatarImage
}