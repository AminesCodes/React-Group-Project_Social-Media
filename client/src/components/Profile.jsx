import React from 'react'
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
                    waitingForData: false
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
                // this.setState({ waitingForData: true })
                const updateData = { 
                    oldPassword: oldPassword, 
                    newPassword: newPassword, 
                    confirmedPassword: newPasswordConfirmation, 
                }

                const { data } = await axios.patch(`http://localhost:3129/users/${id}/password`, updateData)
                console.log(data)
                // this.setState({ waitingForData: false })
                if (data.status === 'success') {
                    sessionStorage.setItem('Parent-Ing_App_KS', newPassword);
                    toast.success('Password updated successfully ',
                    { position: toast.POSITION.BOTTOM_CENTER });

                } else {
                    toast.warn('Something went wrong!!',
                    { position: toast.POSITION.TOP_CENTER });
                }
            } catch (err) {
                // this.setState({ waitingForData: false })
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
        
    }


    // ############ RENDER ############
    render() {
        let avatarImage = 
            <div className='form-group col-sm-12'>
                <img className='avatarImage' src={'../media/avatar.png'} alt='profile avatar'></img>
            </div>
        if (this.state.avatar) {
            avatarImage = 
                <div className='form-group col-sm-12'>
                    <img className='avatarImage' src={this.state.avatar}    alt='profile avatar'></img>
                </div>
        }

        let content =
            <div className='spinner-border m-5' role='status'>
                <span className='sr-only  text-center'>Loading...</span>
            </div>

        if (!this.state.waitingForData) {
            content = 
            <>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <a className={`nav-item nav-link ${this.state.profileTab}`} id='nav-profile-tab' data-toggle='tab' href='#nav-profile' role='tab' aria-controls='nav-profile' aria-selected={this.state.profileTabArea} >Profile</a>
                        <a className={`nav-item nav-link ${this.state.passwordTab}`} id='nav-password-tab' data-toggle='tab' href='#nav-password' role='tab' aria-controls='nav-password' aria-selected={this.state.passwordTabArea}>Update Password</a>
                        <a className={`nav-item nav-link ${this.state.postsTab}`}  id='nav-posts-tab' data-toggle='tab' href='#nav-posts' role='tab' aria-controls='nav-posts' aria-selected={this.state.postsTabArea}>My Posts</a>
                    </div>
                </nav>

                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-profile' role='tabpanel' aria-labelledby='nav-profile-tab'>
                        <form className='form-row was-validated' onSubmit={this.handleFormSubmit}>
                            {avatarImage}
                            <div className='form-group col-sm-6'>
                                <label htmlFor='email'>Email address: </label>
                                <input className='form-control' id='email' type='email' value={this.state.email} onChange={this.handleEmailInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='username'>Username: </label>
                                <input className='form-control' id='username' type='text' value={this.state.username} onChange={this.handleUsernameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='firstname'>First name: </label>
                                <input className='form-control' id='firstname' type='text' value={this.state.firstName} onChange={this.handleFirstNameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='lastname'>Last name: </label>
                                <input className='form-control' id='lastname' type='text' value={this.state.lastName} onChange={this.handleLastNameInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='avatar'>Avatar</label>
                                <input className='form-control' id='avatar' type='file' accept='image/*' onChange={this.handleFileInput}></input>
                                <img id="avatar" className="preview_img" />
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='password'>Password to allow changes: </label>
                                <input className='form-control' id='password' type='password' autoComplete='off' value={this.state.password} onChange={this.handlePasswordInput} required></input>
                            </div>
                            <div className='form-group col-sm-12'>
                                <label htmlFor='joiningDate'>Member since: </label>
                                <input className='form-control' id='joiningDate' type='date' value={this.state.joiningDate} disabled></input>
                            </div>
                            <div className='d-sm-flex justify-content-between col-sm-12'>
                                <button className='d-lg-block'>Update Information</button>
                                <button className='d-lg-block' onClick={this.handleDeleteAccount}>Delete Account</button>
                            </div>
                        </form>
                    </div>
                    <div className='tab-pane fade' id='nav-password' role='tabpanel' aria-labelledby='nav-password-tab'>
                        <form className='form-row was-validated' onSubmit={this.handlePasswordForm}>
                            <div className='form-group col-sm-12'>
                                <label htmlFor='oldPassword'>Old Password: </label>
                                <input className='form-control' id='oldPassword' type='password' autoComplete='off' value={this.state.oldPassword} onChange={this.handleOldPasswordInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='newPassword'>New Password: </label>
                                <input className='form-control' id='newPassword' type='password' autoComplete='off' value={this.state.newPassword} onChange={this.handleNewPasswordInput} required></input>
                            </div>
                            <div className='form-group col-sm-6'>
                                <label htmlFor='newPasswordConfirmation'>Confirm Password: </label>
                                <input className='form-control' id='newPasswordConfirmation' type='password' autoComplete='off' value={this.state.newPasswordConfirmation} onChange={this.handleNewPasswordConfirmInput} required></input>
                            </div>
                            <div className='d-sm-flex justify-content-between col-sm-12'>
                                <button className='d-lg-block'>Update Information</button>
                            </div>
                        </form>
                    </div>
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