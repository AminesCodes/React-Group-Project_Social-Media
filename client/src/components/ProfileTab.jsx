import React from 'react';
import Avatar from './Avatar';

export default class ProfileTab extends React.PureComponent {
    componentDidMount() {
        this.props.handleTabSelection(1)
    }
    
    // ##################### RENDER ######################
    render() {
        return (
            <div className={`tab-pane fade show ${this.props.active}`}>
                <Avatar avatar={this.props.avatar} />
                <form className='form-row was-validated' onSubmit={e => this.props.handleFormSubmit(e)}>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='email'>Email address: </label>
                        <input className='form-control' id='email' type='email' value={this.props.email} onChange={e => this.props.handleEmailInput(e)} required></input>
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='username'>Username: </label>
                        <input className='form-control' id='username' type='text' value={this.props.username} onChange={e => this.props.handleUsernameInput(e)} required></input>
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='firstname'>First name: </label>
                        <input className='form-control' id='firstname' type='text' value={this.props.firstName} onChange={e => this.props.handleFirstNameInput(e)} required></input>
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='lastname'>Last name: </label>
                        <input className='form-control' id='lastname' type='text' value={this.props.lastName} onChange={e => this.props.handleLastNameInput(e)} required></input>
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='avatar'>Avatar</label>
                        <input className='form-control' id='avatar' type='file' accept='image/*' onChange={e => this.props.handleFileInput(e)}></input>
                        <img id="avatar" className="preview_img" />
                    </div>
                    <div className='form-group col-sm-6'>
                        <label htmlFor='password'>Password to allow changes: </label>
                        <input className='form-control' id='password' type='password' autoComplete='off' value={this.props.password} onChange={e => this.props.handlePasswordInput(e)} required></input>
                    </div>
                    <div className='form-group col-sm-12'>
                        <label htmlFor='bio'>Bio: </label>
                        <textarea className='form-control' id='bio' rows='5' value={this.props.bio} onChange={e =>this.props.handleBioInput(e)}></textarea>
                    </div>
                    <div className='d-sm-flex justify-content-between col-sm-12'>
                        <button className='d-lg-block'>Update Information</button>
                    </div>
                </form>
                <button className='d-lg-block' onClick={e => this.props.handleDeleteAccount(e)}>Delete Account</button>
            </div>
        )
    }

    
}