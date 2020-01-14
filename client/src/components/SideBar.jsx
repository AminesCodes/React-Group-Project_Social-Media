/*
SideBar Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { NavLink, Link, Route } from 'react-router-dom';

import './SideBar.css';


export default class SideBar extends PureComponent {
  state = {

  }


  // ################ RENDER ###########
  render() {
    return (
          <ul className='j-sidebar nav flex-column'>
              <li className='nav-item'>
                  <NavLink className='nav-link' to={`/${this.props.username}/feed`}>Home</NavLink>
                  <Route path={'/*/feed'}>
                    <ul>
                      <li>
                        <NavLink className='j-sub-nav' exact to={`/${this.props.username}/feed`}>Your Feed</NavLink>
                      </li>
                      <li>
                        <NavLink className='j-sub-nav' to={`/${this.props.username}/feed/all`}>Explore</NavLink>
                      </li>
                    </ul>
                  </Route> 
              </li>
              <li className='nav-item'>
                  <NavLink className='nav-link' to={`/${this.props.username}/persona`}>Persona</NavLink>
                  <Route path={'/*/persona'}>
                    <ul>
                      <li>
                        <NavLink className='j-sub-nav' exact to={`/${this.props.username}/persona`}>Appreciator</NavLink>
                      </li>
                      <li>
                        <NavLink className='j-sub-nav' to={`/${this.props.username}/persona/cosplayer`}>Cosplayer</NavLink>
                      </li>
                      <li>
                        <NavLink className='j-sub-nav' to={`/${this.props.username}/persona/designer`}>Designer</NavLink>
                      </li>
                    </ul>
                  </Route> 
              </li>
              <li className='nav-item'>
                  <NavLink className='nav-link' to={`/${this.props.username}/events`}>Events</NavLink>
                  <Route path={'/*/events'}>
                    <ul>
                      <li>
                        <NavLink className='j-sub-nav' exact to={`/${this.props.username}/events`}>Events Hub</NavLink>
                      </li>
                    </ul>
                  </Route> 
              </li>
              <li className='nav-item'>
                  <NavLink className='nav-link' to={`/${this.props.username}/account`}>Account</NavLink>
                  <Route path={'/*/account'}>
                    <ul>
                      <li>
                        <NavLink className='j-sub-nav' exact to={`/${this.props.username}/account`}>Edit My Account</NavLink>
                      </li>
                    </ul>
                  </Route> 
              </li>
              <li className='nav-item'>
                  <Link className='nav-link' to='/' onClick={this.props.logout}>Logout</Link>
              </li>
          </ul>
    );
  }
}