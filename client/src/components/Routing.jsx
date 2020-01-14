import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Routing.css';

import TopBar from './TopBar';
import SideBar from './SideBar';
import Feed from './Feed';
import Persona from './Persona';
import Events from './Events';
import Account from './Account';
import AboutSA from './AboutSA';
import ErrorNotFound from './ErrorNotFound';


export default class Routing extends PureComponent {
  state = {
    search: ''
  }

  handleSearchForm = async (event) => {
    event.preventDefault()
  }

  handleSearchInput = event => {
    this.setState({search: event.target.value})
  }


  // ################ RENDER ###########
  render() {
    return (
        <div className="maingrid bs container-fluid">

            <div className="j-topbar bs row">
                <div className="bs col">
                    <TopBar username={this.props.username} />
                </div>
            </div>

            <div className="j-stage bs row">
                <div className="j-col-2 bs col-2">
                    <SideBar username={this.props.username} logout={this.props.logout} />
                </div>
                <div className="bs col">
                    <Switch>
                        <Route exact path='/' component={Feed} />
                        <Route path={'/undefined/:page'} component={ErrorNotFound} />
                        <Route path={'/:username/feed'} render={props => (<Feed username={this.props.username} {...props} /> )} />
                        <Route path={'/:username/persona'} render={props => (<Persona username={this.props.username} {...props} /> )} />
                        <Route path={'/:username/events'} render={props => (<Events username={this.props.username} {...props} /> )} />
                        <Route path={'/about'} render={props => (<AboutSA username={this.props.username} {...props} /> )} />
                        <Route path={'/:username/account'} render={props => (<Account username={this.props.username} logout={this.props.logout} {...props} /> )} />
                        <Route exact component={ErrorNotFound} />
                    </Switch>
                </div>
            </div>
        </div>
    )
  }
}