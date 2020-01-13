/*
SideBar Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// import './SideBar.css';


export default class SideBar extends PureComponent {
  state = {
    search: ''
  }


  // ################ RENDER ###########
  render() {
    return (
      <div className='collapse navbar-collapse justify-content-end' id='collapsibleNavbar'>
          <ul className='navbar-nav'>
              <li className='nav-item'>
                  <Link className='nav-link mb-0 h6 text-light' to='/'>Feed</Link>
              </li>
              <li className='nav-item'>
                  <Link className='nav-link mb-0 h6 text-light' to={`/${this.props.username}/following`}>Following</Link>
              </li>
              <li className='nav-item'>
                  <Link className='nav-link mb-0 h6 text-light' to={`/${this.props.username}/account`}>Account</Link>
              </li>
              <li className='navbar-nav float-right'>
                  <div className='btn-nav float-right'>
                      <Link className='btn btn-secondary btn-small navbar-btn' to='/' onClick={this.props.logout}>Logout</Link>
                  </div>
              </li>
          </ul>
      </div>
    );
  }
}