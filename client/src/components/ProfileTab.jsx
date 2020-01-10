import React from 'react';
import Avatar from './Avatar';

export default function ProfileTab(props) {
    return (
        <div className='tab-pane fade show active' id='nav-profile' role='tabpanel' aria-labelledby='nav-profile-tab'>
            <Avatar avatar={props.avatar} />
            <form className='form-row was-validated' onSubmit={e => props.handleFormSubmit(e)}>
                <div className='form-group col-sm-6'>
                    <label htmlFor='email'>Email address: </label>
                    <input className='form-control' id='email' type='email' value={props.email} onChange={e => props.handleEmailInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='username'>Username: </label>
                    <input className='form-control' id='username' type='text' value={props.username} onChange={e => props.handleUsernameInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='firstname'>First name: </label>
                    <input className='form-control' id='firstname' type='text' value={props.firstName} onChange={e => props.handleFirstNameInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='lastname'>Last name: </label>
                    <input className='form-control' id='lastname' type='text' value={props.lastName} onChange={e => props.handleLastNameInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='avatar'>Avatar</label>
                    <input className='form-control' id='avatar' type='file' accept='image/*' onChange={e => props.handleFileInput(e)}></input>
                    <img id="avatar" className="preview_img" />
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='password'>Password to allow changes: </label>
                    <input className='form-control' id='password' type='password' autoComplete='off' value={props.password} onChange={e => props.handlePasswordInput(e)} required></input>
                </div>
                <div className='form-group col-sm-12'>
                    <label htmlFor='bio'>Bio: </label>
                    <input className='form-control' id='bio' type='textarea' value={props.bio} onChange={e =>props.handleBioInput(e)}></input>
                </div>
                <div className='d-sm-flex justify-content-between col-sm-12'>
                    <button className='d-lg-block'>Update Information</button>
                </div>
            </form>
            <button className='d-lg-block' onClick={e => props.handleDeleteAccount(e)}>Delete Account</button>
        </div>
    )
}