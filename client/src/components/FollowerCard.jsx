import React from 'react'
import Avatar from './Avatar'

export default function FollowerCard(props) {
    const ButtonText = props.btn
    return (
        <div className='m-2 p-2'>
            <div className="card">
                <div className="card-img-top d-flex align-items-center bg-light">
                    <div>
                        <Avatar avatar={props.avatar} />
                    </div>
                    <strong className="col p-2 m-0">{props.username}</strong>
                </div>
                <button className='btn btn-sm btn-info w-90 m-2' onClick={e => props.buttonClick(props.userId)}>{ButtonText}</button>
            </div>
        </div>
    )
}