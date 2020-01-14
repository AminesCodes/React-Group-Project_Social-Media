import React from 'react'
import axios from 'axios'

import PostThumbnail from './PostThumbnail'
import PostLightBox from './PostLightBox'
import UploadPost from './UploadPost'

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


export default class PersonalPosts extends React.PureComponent {
    state = {
        userPosts: [],
        targetPostId: 0,
        targetPost: null,
        targetPostCaption: '',
        displayTargetPost: false,
    }

    getUserPosts = async (userId) => {
        try {
            const { data } = await axios.get(`http://localhost:3129/posts/userid/${userId}`)
            this.setState({ userPosts: data.payload })
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    componentDidMount() {
        this.props.handleTabSelection(3)
        this.getUserPosts(this.props.userId)
    }

    handlePicClick = async (index) => {
        this.setState({
            targetPostId: this.state.userPosts[index].id,
            targetPost: this.state.userPosts[index],
            targetPostCaption: this.state.userPosts[index].caption,
            displayTargetPost: true
        })
    }

    handleClosePost = () => {
        this.setState({ displayTargetPost: false })
    }

    handleForm = async (event, postId) => {
        event.preventDefault()

        try {
            const pw = sessionStorage.getItem('Parent-Ing_App_KS')
            const user = {
                password: pw,
                currUserId: this.props.userId,
                caption: this.state.targetPostCaption
            }
            const { data } = await axios.patch(`http://localhost:3129/posts/edit/${postId}`, user)
            if (data.status === 'success') {
                this.getUserPosts(this.props.userId)
                toast.success('✓',
                    { position: toast.POSITION.BOTTOM_CENTER });
            }

        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    handleCaptionInput = event => {
        this.setState({targetPostCaption: event.target.value})
    }

    handleDeletePost = async (postId) => {
        try {
            const pw = sessionStorage.getItem('Parent-Ing_App_KS')
            const user = {
                password: pw,
                currUserId: this.props.userId,
            }
            const { data } = await axios.patch(`http://localhost:3129/posts/delete/${postId}`, user)
            if (data.status === 'success') {
                this.getUserPosts(this.props.userId)
                this.setState({displayTargetPost: false})
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    reloadPosts = () => {
        this.getUserPosts(this.props.userId)
    }
    
    // ##################### RENDER ######################
    render() {
        let post = null
        if (this.state.displayTargetPost) {
            post = <PostLightBox userId={this.props.userId} postId={this.state.targetPostId} caption={this.state.targetPostCaption} image={this.state.targetPost.image_url} timestamp={this.state.targetPost.time_created} handleClosePost={this.handleClosePost} handleDeletePost={this.handleDeletePost} handleCaptionInput={this.handleCaptionInput} handleForm={this.handleForm}/>
        }
        return (
            <div className={`container tab-pane ${this.props.active}`}>
                <div className='d-flex flex-wrap'>
                    <UploadPost userId={this.props.userId} reloadPosts={this.reloadPosts}/>
                    {this.state.userPosts.map((post, index) => <PostThumbnail index={index} key={post.image_url+post.time_created} id={post.id} image={post.image_url} tags={post.hashtag_str} handlePicClick={this.handlePicClick}/>)}
                </div>
                {post}
            </div>
        )
    }
}