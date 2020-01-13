import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Feed from './Feed';
import Account from './Account';
import ErrorNotFound from './ErrorNotFound';

import { ReactComponent as Logo } from '../assets/images/logo_200112.svg';

export default class Routing extends React.PureComponent {
    state = {
        search: ''
    }

    handleSearchForm = async (event) => {
        event.preventDefault()
    }

    handleSearchInput = event => {
        this.setState({search: event.target.value})
    }


    //################ RENDER ###########
    render() {
        return (
            <>
                <nav className='navbar navbar-expand-md navbar-light bg-appColor'>
                    <Link className='navbar-brand' to='/'>
                        <Logo className='img-fluid' alt='SuitApp Logo' title='SuitApp Logo' height='108px' width='130px' />
                    </Link>
                    <form onSubmit={this.handleSearchForm}>
                        <input type="search" value={this.state.search} onChange={this.handleSearchInput}/>
                    </form>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-end' id='collapsibleNavbar'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to='/'>Feed</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.username}/following`}>Following</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link mb-0 h6 text-dark' to={`/${this.props.username}/account`}>Account</Link>
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
                    <Route exact path='/' component={Feed} />
                    <Route path={`/undefined/:page`} component= {ErrorNotFound} />
                    <Route path={`/:username/following`} render={props => (<Feed username={this.props.username} {...props} /> )} />
                    <Route path={`/:username/account`} render={props => (<Account username={this.props.username} logout={this.props.logout} {...props} /> )} />
                    <Route exact component= {ErrorNotFound} />
                </Switch>
            </>
        )
    }
}