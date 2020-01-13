import React from 'react'

export default function PostLightBox(props) {
    const backgroundColor = 'rgba(77, 73, 73, 0.542)'
    const divStyle = {
        position: 'absolute',
        top: '10%',
        height: '85%',
        width: '100%',
        backgroundColor: backgroundColor,
    }

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'scale-down',
    }

    return ( 
        <div className='container rounded' style={divStyle}>
            <div className='card position-relative' style={{width: '100%', height: '100%', backgroundColor: backgroundColor}}>
                <button className='position-absolute' onClick={props.handleClosePost}>Close</button>
                <div className='card-img-top' style={{width: '100%', height: '80%'}}>
                    <span className='float-right' onClick={() => props.handleDeletePost(props.postId)}>Delete</span>
                    <img src={props.image} alt='Card' style={imageStyle}/>
                </div>
                <div className='card-body p-1' style={{width: '100%', height: '20%'}}>
                    <form className='d-flex' onSubmit={e => props.handleForm(e, props.postId)} style={{width: '100%', height: '100%'}}>
                        <div className='d-flex flex-column'>
                            <span className='flex-grow-1'>Edit</span>
                            <button>Save</button>
                        </div>
                        <textarea className='rounded flex-grow-1' value={props.caption} onChange={e => props.handleCaptionInput(e)}></textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}