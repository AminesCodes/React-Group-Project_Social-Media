import React from 'react'
import axios from 'axios'

import Comments from './Comments'
import { ReactComponent as TrashCan } from '../assets/images/icons/trash-solid.svg';
import { ReactComponent as Close } from '../assets/images/icons/times-circle-solid.svg';
import { ReactComponent as Edit } from '../assets/images/icons/edit-solid.svg';
import { ReactComponent as Save } from '../assets/images/icons/save-solid.svg';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleNetworkErrors = err => {
    if (err.response) {
        if (err.response.data.message) {
            toast.error(err.response.data.message,
                { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error(`${err.response.data}: ${err.response.status} - ${err.response.statusText}`,
            { position: toast.POSITION.TOP_CENTER });
            console.log('Error', err);
        }
    } else if (err.message) {
        toast.error(err.message,
            { position: toast.POSITION.TOP_CENTER });
    } else {
        toast.error('Sorry, an error occurred, try again later',
            { position: toast.POSITION.TOP_CENTER });
        console.log('Error', err);
    }
}

export default class PostLightBox extends React.PureComponent {
    state = {
        comments: [],
        reactions: [],
        displayComments: false,
        showComments: false,
    }

    getAllCommentsAndReactions = async (postId) => {
        try {
            const promises = []
    
            promises.push(axios.get(`http://localhost:3129/comments/${postId}`))
            // promises.push(axios.get(`http://localhost:3129/reactions/${postId}`))
    
            const response = await Promise.all(promises)
            this.setState({
                comments: response[0].data.payload,
                // reactions: response[1].data.payload,
            })
            console.log(response[0].data.payload)
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    componentDidMount() {
        this.getAllCommentsAndReactions(this.props.postId)
    }

    handleShowComments = () => {
        this.setState({showComments: true})
    }
    handleCloseComments = () => {
        this.setState({showComments: false})
    }

    // ######################## RENDER ###################
    render() {
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

        let commentsContainer = null
        if (this.state.showComments) {
            commentsContainer = <Comments userId={this.props.userId} postId={this.props.postId} allComments={this.state.comments}/>
        }
    
        return ( 
            <>
            <div className='container rounded' style={divStyle}>
                <div className='card position-relative' style={{width: '100%', height: '100%', backgroundColor: backgroundColor}}>
                    <Close className='position-absolute icon' onClick={this.props.handleClosePost} />
                    <div className='card-img-top position-relative' style={{width: '100%', height: '80%'}}>
                        <TrashCan className='icon' style={{position: 'absolute', top: '0', right: '0'}} onClick={() => this.props.handleDeletePost(this.props.postId)}/>
                        <img src={this.props.image} alt='Card' style={imageStyle}/>
                        <span className='timestampSpan'>{new Date(this.props.timestamp).toLocaleString()}</span>
                    </div>
                    <div className='card-body p-1' style={{width: '100%', height: '20%'}}>
                        <form className='d-flex' onSubmit={e => this.props.handleForm(e, this.props.postId)} style={{width: '100%', height: '83%'}}>
                            <div className='d-flex flex-column'>
                                <label htmlFor='captionEdit'><Edit className='icon flex-grow-1'/></label>
                                <button className='btn btn-primary'><Save style={{width: '30px'}}/></button>
                            </div>
                            <textarea className='rounded flex-grow-1' id='captionEdit' value={this.props.caption} onChange={e => this.props.handleCaptionInput(e)}></textarea>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <span className='text-white p-0 m-0 cursorPointer'>Reactions <span>{this.state.reactions.length}</span></span>
                            <span className='text-white p-0 m-0 cursorPointer' onClick={this.handleShowComments}>Comments <span>{this.state.comments.length}</span></span>
                        </div>
                    </div>
                </div>
            </div>
            {commentsContainer}
            </>
        )
    }
}