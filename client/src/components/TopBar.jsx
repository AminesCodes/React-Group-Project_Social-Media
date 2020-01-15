/*
CSS Reset | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './TopBar.css';

import UsernameSign from './UsernameSign';

// import { ReactComponent as Logo } from '../assets/images/logo_200112.svg';
const imgLogo = require('../assets/images/logo-quick.png');

class TopBar extends PureComponent {
  state = {
    search: ''
  }

  handleSearchForm = async (event) => {
    event.preventDefault();
    console.log(this.props.history)
    this.props.history.push({
        pathname: `/${this.props.username}/feed/all`,
        search: `?search=${this.state.search}`
    });
  }

  handleSearchInput = event => {
    this.setState({search: event.target.value})
  }


  // ################ RENDER ###########
  render() {
    return (
      <nav className='j-navbar navbar navbar-expand-md'>
      
          <UsernameSign username={this.props.username} />

          <Link className='navbar-brand' to='/'>
              <img className='j-logo' src={imgLogo} alt="SuitApp Logo" />
              {/* <Logo className='j-logo' alt='SuitApp Logo' title='SuitApp Logo' /> height='108px' width='130px'*/}
          </Link>

          <form onSubmit={this.handleSearchForm}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">#</span>
              </div>
              <input type="search" value={this.state.search} onChange={this.handleSearchInput} className="form-control" placeholder="search hashtags" aria-label="hashtags" aria-describedby="basic-addon1" />
            </div>
          </form>

          <button className='navbar-toggler navbar-dark' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>
              <span className='navbar-toggler-icon'></span>
          </button>

      </nav>
    )
  }
}

export default withRouter(TopBar);
