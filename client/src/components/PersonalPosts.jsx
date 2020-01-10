import React from 'react'

export default function PersonalPosts(props) {
    return (
        <div className={`tab-pane fade show ${props.active}`} id='nav-posts' role='tabpanel' aria-labelledby='nav-posts-tab'>
            MY POSTS HERE - {props.userId}
        </div>
    )
}