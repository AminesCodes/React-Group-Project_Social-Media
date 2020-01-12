import React from 'react'
import axios from 'axios'

import PostThumbnail from './PostThumbnail'
import PostLightBox from './PostLightBox'

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
        displayTargetPost: false,
    }

    async componentDidMount() {
        this.props.handleTabSelection(3)
        try {
            const { data } = await axios.get(`http://localhost:3129/posts/userid/${this.props.userId}`)
            this.setState({ userPosts: data.payload })
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    handleDeletePost = async (postId) => {
        console.log(postId)
    }

    handlePicClick = async (postId) => {
        try {
            const { data } = await axios.get(`http://localhost:3129/posts/${postId}`)
            this.setState({
                targetPostId: postId,
                targetPost: data.payload,
                displayTargetPost: true
            })
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    handleClosePost = () => {

    }
    
    // ##################### RENDER ######################
    render() {
        console.log(this.state.targetPost)
        let post = null
        if (this.state.displayTargetPost) {
            post = <PostLightBox />
        }
        return (
            <div className={`tab-pane ${this.props.active}`}>
                <div className='d-flex flex-wrap'>
                    {this.state.userPosts.map(post => <PostThumbnail key={post.image_url+post.time_created} id={post.id} image={post.image_url} tags={post.hashtag_str} handlePicClick={this.handlePicClick}/>)}
                </div>
                {post}
            </div>
        )
    }
}