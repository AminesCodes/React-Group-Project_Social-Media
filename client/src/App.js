/*
Sitewide Styling | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
import { toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

import './App.css'; // this must stay before component imports

import LoginSigninForm from './components/LoginSigninForm';
import Intro from './components/Intro';
import Routing from './components/Routing';

toast.configure();

const imgLogo = require('./assets/images/logo.png');


export default class App extends PureComponent {
  state = {
    loggedUser: '',
  }

  handleFormSubmit = (user, password) => {
    sessionStorage.setItem('Parent-Ing_App_KS', password);
    sessionStorage.setItem('Parent-Ing_App_UId', user.id);
    sessionStorage.setItem('Parent-Ing_App_Un', user.username);
    this.setState({loggedUser: user});
  }

  handleLogOut = () => {
    sessionStorage.clear();
    this.setState({loggedUser: null})
  }


  // ###################### RENDER ######################
  render() {
    const pw = sessionStorage.getItem('Parent-Ing_App_KS')
    const uId = sessionStorage.getItem('Parent-Ing_App_UId')
    const username = sessionStorage.getItem('Parent-Ing_App_Un')

    let pageContent = 
      <>
        <div className="jumbotron bg-appColor text-white">
          <div className="container-sm mx-auto">
            <img className='img-fluid d-sm-block mx-auto' src={imgLogo} alt='app logo'/>
            <h1 className='text-center'>SuitApp</h1>
          </div>
          <LoginSigninForm formSubmit={this.handleFormSubmit}/>
        </div>
        <Intro className='container-sm'/>
      </>

    if (pw && uId) {
      pageContent = <Routing user={this.state.loggedUser} username={username} logout={this.handleLogOut}/>
    }

    return (
      <div className="App">
        {pageContent}
      </div>
    );
  }
}
