import React from 'react'
import { ReactComponent as TrashCan } from '../assets/images/icons/trash-solid.svg';
import { ReactComponent as Close } from '../assets/images/icons/times-circle-solid.svg';
import { ReactComponent as Edit } from '../assets/images/icons/edit-solid.svg';
import { ReactComponent as Save } from '../assets/images/icons/save-solid.svg';

export default function PostLightBox(props) {
    const backgroundColor = 'rgba(77, 73, 73, 0.542)'
    const divStyle = {
        position: 'absolute',
        top: '3%',
        height: '95%',
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
                <Close className='position-absolute icon' onClick={props.handleClosePost} />
                <div className='card-img-top position-relative' style={{width: '100%', height: '80%'}}>
                    <TrashCan className='icon' style={{position: 'absolute', top: '0', right: '0'}} onClick={() => props.handleDeletePost(props.postId)}/>
                    <img src={props.image} alt='Card' style={imageStyle}/>
                    <span className='timestampSpan'>{new Date(props.timestamp).toLocaleString()}</span>
                </div>
                <div className='card-body p-1' style={{width: '100%', height: '20%'}}>
                    <form className='d-flex' onSubmit={e => props.handleForm(e, props.postId)} style={{width: '100%', height: '83%'}}>
                        <div className='d-flex flex-column'>
                            <label htmlFor='captionEdit'><Edit className='icon flex-grow-1'/></label>
                            <button className='btn btn-primary'><Save style={{width: '30px'}}/></button>
                        </div>
                        <textarea className='rounded flex-grow-1' id='captionEdit' value={props.caption} onChange={e => props.handleCaptionInput(e)}></textarea>
                    </form>
                    <span className='timestampSpan p-0 m-0'>Comments <span>num</span></span>
                </div>
            </div>
        </div>
    )
}