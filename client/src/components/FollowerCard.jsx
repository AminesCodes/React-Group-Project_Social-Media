import React from 'react'
import Avatar from './Avatar'

export default function FollowerCard(props) {
    return (
        <div className='m-2 p-2'>
            <div className='card border border-light rounded'>
                <div className="card-img-top d-flex align-items-center bg-light">
                    <div>
                        <Avatar avatar={props.avatar} />
                    </div>
                    <strong className='col p-2 m-0'>{props.username}</strong>
                </div>
                <button className={`btn btn-sm btn-info w-90 m-2 ${props.active}`} onClick={e => props.buttonClick(props.userId)}>{props.btn}</button>
            </div>
        </div>
    )
}