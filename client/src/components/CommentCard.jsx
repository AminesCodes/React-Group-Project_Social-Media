import React from 'react'
import Avatar from './Avatar'

export default function CommentCard(props) {
    return (
        <div className='row'>
            <div className='col-sm-3'>
                <Avatar className='d-block' avatar={props.avatar} />
                <strong className='d-block p-2 m-0'>{props.username}</strong>
            </div>
            <div className='col-sm-9'>
                <span className='d-block m-2'>{props.comment}</span>
                <span className='d-block m-2'>{new Date(props.timestamp).toLocaleString()}</span>
            </div>
        </div>
    )
}