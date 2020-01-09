import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Logo from '../media/logo.png'
import Home from './Home'
import Posts from './Posts'
import Pictures from './Pictures'
import Likes from './Likes'
import Profile from './Profile'
import ErrorNotFound from './ErrorNotFound'

export default class Welcome extends React.PureComponent {



    //################ RENDER ###########
    render() {
        const username = sessionStorage.getItem('Parent-Ing_App_Un')

        return (
            <>
                <nav className='navbar navbar-expand-md navbar-light bg-appColor'>
                    <Link className='navbar-brand' to='/'>
                        <img className='img-fluid' src={Logo} alt='app logo' width='130px' />
                    </Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='collapsibleNavbar'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${username}/posts`}>My Posts</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${username}/pictures`}>My Pics</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${username}/likes`}>My Likes</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${username}/profile`}>Profile</Link>
                            </li>
                        <li className='navbar-nav float-right'>
                            <div className='btn-nav float-right'>
                                <Link className='btn btn-secondary btn-small navbar-btn' to='/' onClick={this.props.logout}>Logout</Link>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path={`/undefined/:page`} component= {ErrorNotFound} />
                    <Route path={`/:username/posts`} render={props => (<Posts username={username} {...props} /> )} />
                    <Route path={`/:username/pictures`} render={props => (<Pictures username={username} {...props} /> )} />
                    <Route path={`/:username/likes`} render={props => (<Likes username={username} {...props} /> )} />
                    <Route path={`/:username/profile`} render={props => (<Profile username={username} {...props} /> )} />
                    <Route exact component= {ErrorNotFound} />
                </Switch>
            </>
        )
    }
}