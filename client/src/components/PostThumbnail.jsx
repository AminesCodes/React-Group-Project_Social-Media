import React from 'react'

export default function PostThumbnail(props) {
    return (
        <div className='img-thumbnail align-self-start m-2'>{/* <button className='btn btn-danger align-self-end' onClick={e => props.handleDeletePost(props.id)}>X</button> */}
            <img className='img-fluid cursorPointer' src={props.image} alt={props.tags} width='100px' onClick={e => props.handlePicClick(props.index)}/>
        </div>
    )
}