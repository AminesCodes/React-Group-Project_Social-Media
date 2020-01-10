import React from 'react'

export default function PasswordTab(props) {
    return (
        <div className={`tab-pane fade show ${props.active}`} id='nav-password' role='tabpanel' aria-labelledby='nav-password-tab'>
            <form className='form-row was-validated' onSubmit={e => props.handlePasswordForm(e)}>
                <div className='form-group col-sm-12'>
                    <label htmlFor='oldPassword'>Old Password: </label>
                    <input className='form-control' id='oldPassword' type='password' autoComplete='off' value={props.oldPassword} onChange={e => props.handleOldPasswordInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='newPassword'>New Password: </label>
                    <input className='form-control' id='newPassword' type='password' autoComplete='off' value={props.newPassword} onChange={e => props.handleNewPasswordInput(e)} required></input>
                </div>
                <div className='form-group col-sm-6'>
                    <label htmlFor='newPasswordConfirmation'>Confirm Password: </label>
                    <input className='form-control' id='newPasswordConfirmation' type='password' autoComplete='off' value={props.newPasswordConfirmation} onChange={e => props.handleNewPasswordConfirmInput(e)} required></input>
                </div>
                <div className='d-sm-flex justify-content-between col-sm-12'>
                    <button className='d-lg-block'>Update Information</button>
                </div>
            </form>
        </div>
    )
}