import React from 'react'
import FollowCard from './FollowerCard'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleNetworkErrors = err => {
    if (err.response) {
        if (err.response.data.message) {
            toast.error(err.response.data.message,
                { position: toast.POSITION.TOP_CENTER });
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
        followers: [],
        following: [],
    }

    getRelations = async (userId) => {
        try {
            const promises = []
            promises.push(axios.get(`http://localhost:3129/follows/${userId}`)) // Followers
            promises.push(axios.get(`http://localhost:3129/follows/followers/${userId}`)) //     Following

            const response = await Promise.all(promises)
            this.setState({
                followers: response[0].data.payload,
                following: response[1].data.payload,
            })
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    async componentDidMount() {
        this.props.handleTabSelection(4)
        await this.getRelations(this.props.userId)
    }

    handleUnfollowButton = async (targetId) => {
        try {

        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    handleFollowButton = async (targetId) => {
        try {

        } catch (err) {
            handleNetworkErrors(err)
        }
    }
    
    // ##################### RENDER ######################
    render() {
        return (
            <div className={`d-md-flex justify-content-center mb-3 tab-pane fade show ${this.props.active}`}>
                <div className='container-sm'>
                    <strong>Following :</strong> 
                    {this.state.followers.map(follow => <FollowCard username={follow.follow} userId={follow.followed_user_id} avatar={follow.avatar_url} key={follow.avatar_url} btn='Unfollow' buttonClick={this.handleUnfollowButton}/>)}
                </div>
                
                <div className='container-sm'>
                    <strong>Followers :</strong> 
                    {this.state.following.map(follow => <FollowCard username={follow.follower} userId={follow.follower_id} avatar={follow.avatar_url} key={follow.avatar_url} btn='Follow' buttonClick={this.handleFollowButton}/>)}
                </div>
            </div>
        )
    }
}