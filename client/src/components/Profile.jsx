import React from 'react'
import axios from 'axios'
import ProfileTab from './ProfileTab'
import PasswordTab from './PasswordTab'
import PersonalPosts from './PersonalPosts'

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
        toast.error('Sorry, an error occured, try again later',
            { position: toast.POSITION.TOP_CENTER });
        console.log('Error', err);
    }
}

export default class Account extends React.PureComponent {
    state = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        avatarFile: null,
        bio: '',
        lightTheme: true,
        joiningDate: '',
        password: '',
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
        followers: [],
        following: [],
        waitingForData: true,
        profileTab: 'active',
        profileTabArea: 'true',
        passwordTab: '',
        passwordTabArea: 'false',
        postsTab: '',
        postsTabArea: 'false'
    }

    async componentDidMount() {
        const username = this.props.match.params.username

        if (username !== 'undefined') {
            try {
                const { data } = await axios.get(`http://localhost:3129/users/${username}`)
                this.setState({
                    id: data.payload.id,
                    username: data.payload.username,
                    email: data.payload.email,
                    firstName: data.payload.firstname,
                    lastName: data.payload.lastname,
                    avatar: data.payload.avatar_url,
                    bio: data.payload.bio,
                    lightTheme: data.payload.light_theme,
                    joiningDate: (data.payload.time_created).slice(0, 10),
                    waitingForData: false
                })

                const promises = []
                promises.push(axios.get(`http://localhost:3129/follows/${data.payload.id}`)) // Followers
                promises.push(axios.get(`http://localhost:3129/follows/followers/${data.payload.id}`)) // Following


                const response = await Promise.all(promises)
                console.log(response)
                this.setState({
                    followers: response[0].data.payload,
                    following: response[1].data.payload,
                })

            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Login issue, please logout and login into your account again',
                { position: toast.POSITION.TOP_CENTER });
        }
    }

    handleTabSelection = ref => {
        if (ref === 1) {
            this.setState({
                profileTab: 'active',
                profileTabArea: 'true',
                passwordTab: '',
                passwordTabArea: 'false',
                postsTab: '',
                postsTabArea: 'false'
            })
        } else if (ref === 2) {
            this.setState({
                profileTab: '',
                profileTabArea: 'false',
                passwordTab: 'active',
                passwordTabArea: 'true',
                postsTab: '',
                postsTabArea: 'false'
            })
        } else if (ref === 3) {
            this.setState({
                profileTab: '',
                profileTabArea: 'false',
                passwordTab: '',
                passwordTabArea: 'false',
                postsTab: 'active',
                postsTabArea: 'true'
            })
        }
    }

    handleFormSubmit = async (event) => {
        event.preventDefault()
        const {id, username, firstName, lastName, email, password, bio} = this.state
        
        if (id && username && firstName && lastName && email && password) {
            try {
                this.setState({ waitingForData: true })
                const userInfo = new FormData();
                
                userInfo.append('username', username)
                userInfo.append('firstname', firstName)
                userInfo.append('lastname', lastName)
                userInfo.append('password', password)
                userInfo.append('email', email)
                if (bio) {
                    userInfo.append('bio', bio)
                }
                if (this.state.avatarFile) {
                    userInfo.append('avatar', this.state.avatarFile)
                }

                const { data } = await axios.put(`http://localhost:3129/users/${id}`, userInfo)
                console.log(data.payload)
                this.setState({
                    username: data.payload.username,
                    firstName: data.payload.firstname,
                    lastName: data.payload.lastname,
                    email: data.payload.email,
                    avatar: data.payload.avatar_url,
                    bio: data.payload.bio,
                    password: '',
                    waitingForData: false,
                })
                toast.success('Updated information successfully',
                { position: toast.POSITION.BOTTOM_CENTER });
            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Missing information, All fields with * are required',
                { position: toast.POSITION.TOP_CENTER });
        }
    }

    handlePasswordForm = async (event) => {
        event.preventDefault()
        const { id, oldPassword, newPassword, newPasswordConfirmation } = this.state

        if (oldPassword && newPassword && newPasswordConfirmation && newPassword === newPasswordConfirmation) {
            try {
                this.setState({ waitingForData: true })
                const updateData = { 
                    oldPassword: oldPassword, 
                    newPassword: newPassword, 
                    confirmedPassword: newPasswordConfirmation, 
                }

                const { data } = await axios.patch(`http://localhost:3129/users/${id}/password`, updateData)
                this.setState({ 
                    waitingForData: false,
                    oldPassword: '', 
                    newPassword: '', 
                    newPasswordConfirmation: '', 
                })
                if (data.status === 'success') {
                    sessionStorage.setItem('Parent-Ing_App_KS', newPassword);
                    toast.success('Password updated successfully ',
                    { position: toast.POSITION.BOTTOM_CENTER });

                } else {
                    toast.warn('Something went wrong!!',
                    { position: toast.POSITION.TOP_CENTER });
                }
            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Missing information, All fields are required OR new password confirmation does not match',
                { position: toast.POSITION.TOP_CENTER });
        }
    }

    handleToggleTheme = async (event) => {
        // if (oldPassword && newPassword && newPasswordConfirmation && newPassword === newPasswordConfirmation) {
        //     try {
        //         const updateData = { 
        //             oldPassword: oldPassword, 
        //             newPassword: newPassword, 
        //             confirmedPassword: newPasswordConfirmation, 
        //         }

        //         const { data } = await axios.patch(`http://localhost:3129/users/${id}/password`, updateData)
        //         console.log(data)
        //         if (data.status === 'success') {
        //             sessionStorage.setItem('Parent-Ing_App_KS', newPassword);
        //             toast.success('Password updated successfully ',
        //             { position: toast.POSITION.BOTTOM_CENTER });

        //         } else {
        //             toast.warn('Something went wrong!!',
        //             { position: toast.POSITION.TOP_CENTER });
        //         }
        //     } catch (err) {
        //         handleNetworkErrors(err)
        //     }
        // } else {
        //     toast.error('Missing information, All fields are required OR new password confirmation does not match',
        //         { position: toast.POSITION.TOP_CENTER });
        // }
    }

    handleEmailInput = event => {
        this.setState({email: event.target.value})
    }

    handleUsernameInput = event => {
        this.setState({username: event.target.value})
    }

    handleFirstNameInput = event => {
        this.setState({firstName: event.target.value})
    }

    handleLastNameInput = event => {
        this.setState({lastName: event.target.value})
    }

    handleFileInput = event => {
        this.setState({avatarFile: event.target.files[0]})
    }

    handlePasswordInput = event => {
        this.setState({password: event.target.value})
    }

    handleBioInput = event => {
        this.setState({bio: event.target.value})
    }

    handleOldPasswordInput = event => {
        this.setState({oldPassword: event.target.value})
    }

    handleNewPasswordInput = event => {
        this.setState({newPassword: event.target.value})
    }

    handleNewPasswordConfirmInput = event => {
        this.setState({newPasswordConfirmation: event.target.value})
    }

    handleDeleteAccount = async () => {
        console.log(this.state)
        if (this.state.password && this.state.id) {
            try {
                this.setState({ waitingForData: true })
                await axios.patch(`http://localhost:3129/users/${this.state.id}/delete`, {password: this.state.password})
                this.props.logout()
            } catch (err) {
                this.setState({ waitingForData: false })
                handleNetworkErrors(err)
            }
        } else {
            toast.error('Please enter your password to DELETE your account',
                { position: toast.POSITION.TOP_CENTER });
        }
    }


    // ############ RENDER ############
    render() {
        let content =
            <div className='spinner-border m-5' role='status'>
                <span className='sr-only  text-center'>Loading...</span>
            </div>

        if (!this.state.waitingForData) {
            content = 
            <>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <a className={`nav-item nav-link ${this.state.profileTab}`} id='nav-profile-tab' data-toggle='tab' href='#nav-profile' role='tab' aria-controls='nav-profile' aria-selected={this.state.profileTabArea} onClick={() => this.handleTabSelection(1)}>Profile</a>
                        <a className={`nav-item nav-link ${this.state.passwordTab}`} id='nav-password-tab' data-toggle='tab' href='#nav-password' role='tab' aria-controls='nav-password' aria-selected={this.state.passwordTabArea} onClick={() => this.handleTabSelection(2)}>Update Password</a>
                        <a className={`nav-item nav-link ${this.state.postsTab}`}  id='nav-posts-tab' data-toggle='tab' href='#nav-posts' role='tab' aria-controls='nav-posts' aria-selected={this.state.postsTabArea} onClick={() => this.handleTabSelection(3)}>My Posts</a>
                    </div>
                </nav>

                <div className='tab-content' id='nav-tabContent'>
{/* ############ PROFILE TAB ################ */}
                    <ProfileTab 
                        active = {this.state.profileTab}
                        handleFormSubmit = {this.handleFormSubmit}
                        avatar = {this.state.avatar}
                        email = {this.state.email}
                        handleEmailInput = {this.handleEmailInput}
                        username = {this.state.username}
                        handleUsernameInput = {this.handleUsernameInput}
                        firstName = {this.state.firstName}
                        handleFirstNameInput = {this.handleFirstNameInput}
                        lastName = {this.state.lastName}
                        handleLastNameInput = {this.handleLastNameInput}
                        handleFileInput = {this.handleFileInput}
                        password = {this.state.password}
                        bio = {this.state.bio}
                        handleBioInput = {this.handleBioInput}
                        handlePasswordInput = {this.handlePasswordInput}
                        joiningDate = {this.state.joiningDate}
                        handleDeleteAccount = {this.handleDeleteAccount}
                    />

{/* ############ PASSWORD TAB ################ */}
                    <PasswordTab 
                        active = {this.state.passwordTab}
                        handlePasswordForm = {this.handlePasswordForm}
                        oldPassword = {this.state.oldPassword}
                        handleOldPasswordInput = {this.handleOldPasswordInput}
                        newPassword = {this.state.newPassword}
                        handleNewPasswordInput = {this.handleNewPasswordInput}
                        newPasswordConfirmation = {this.state.newPasswordConfirmation}
                        handleNewPasswordConfirmInput = {this.handleNewPasswordConfirmInput}
                    />

{/* ############ POSTS TAB ################ */}
                    <PersonalPosts
                        active = {this.state.postsTab}
                    />
                </div>
            </>
                
        }

        return (
            <div className='container'>
                {content}

                
            </div>
        )
    }
}