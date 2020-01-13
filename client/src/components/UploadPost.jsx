import React from 'react'
import axios from 'axios'

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

export default class UploadPost extends React.PureComponent{
    state = {
        userId: this.props.userId,
        imageFile: null,
        caption: '',
        position: 'relative',
        imagePreview: ''
    }

    preview_image = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({imagePreview: reader.result})
            }
        reader.readAsDataURL(event.target.files[0]);
    }

    handleFileInput = event => {
        this.setState({
            imageFile: event.target.files[0],
            position: 'absolute'
        })
        this.preview_image(event)
    }

    handleCaptionInput = event => {
        this.setState({caption: event.target.value})
    }

    handleForm = async (event) => {
        event.preventDefault()

        if (this.state.imageFile) {
            const pw = sessionStorage.getItem('Parent-Ing_App_KS')
            const post = new FormData();
            post.append('posts', this.state.imageFile)
            post.append('currUserId', this.state.userId)
            post.append('password', pw)
            post.append('caption', this.state.caption)

            try {
                const { data } = await axios.post(`http://localhost:3129/posts/add`, post)
                if (data.status === 'success') {
                    this.setState({
                        userId: this.props.userId,
                        imageFile: null,
                        caption: '',
                        position: 'relative'
                    })
                    this.props.reloadPosts()
                }
            } catch (err) {
                handleNetworkErrors(err)
            }
        }
    }

    handleClosePost = () => {
        this.setState({
            imageFile: null,
            caption: '',
            position: 'relative',
            imagePreview: ''
        })
    }


    // ##################### RENDER ########################
    render() {
        const backgroundColor = 'rgba(77, 73, 73, 0.542)'
        const divStyle = {
            position: this.state.position,
            top: '10%',
            width: '90%',
            backgroundColor: backgroundColor,
        }
        const imageStyle = {
            width: '100%',
            height: '100%',
            objectFit: 'scale-down',
        }

        let form = null
        if (this.state.imageFile) {
            form = 
                <div className='card position-relative' style={{width: '100%', height: '100%', backgroundColor: backgroundColor}}>
                    <button className='position-absolute' onClick={this.handleClosePost}>Close</button>
                    <div className='card-img-top' style={{width: '100%', height: '80%'}}>
                        <img src={this.state.imagePreview} alt='Card' style={imageStyle}/>
                    </div>
                    <div className='card-body p-1' style={{width: '100%', height: '20%'}}>
                        <form className='d-flex' onSubmit={this.handleForm}>
                            <div className='d-flex flex-column'>
                                <label className='flex-grow-1' htmlFor='captionText'>Caption: </label>
                                <button>Post</button>
                            </div>
                            <textarea className='rounded flex-grow-1' id='captionText' value={this.state.caption} onChange={this.handleCaptionInput}></textarea>
                        </form>
                    </div>
                </div>
        }
    
        return (
            <div className='container rounded m-2 p-2' style={divStyle}>
                <div className='d-flex justify-content-around'>
                    <label className='' htmlFor='postUpload'>Share something</label>
                    <input className='' id='postUpload' type='file' accept='image/*' onChange={this.handleFileInput}></input>
                </div>
                {form}
            </div>
        )
    }
}