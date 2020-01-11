import React from 'react';

export default function Avatar(props) {
    let avatarImage = 
        <div className='avatarDiv'>
            <img className='avatarImage' src={require('../media/avatar.png')} alt='profile avatar'></img>
        </div>
    if (props.avatar) {
        avatarImage = 
            <div className='avatarDiv'>
                <img className='avatarImage' src={props.avatar}    alt='profile avatar'></img>
            </div>
    }

    return avatarImage
}