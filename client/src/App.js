import React from 'react';
import './App.css';

import Logo from './media/logo.png'
import LoginSigninForm from './components/LoginSigninForm'
import Intro from './components/Intro'
import Routing from './components/Routing'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default class App extends React.PureComponent {
  state = {
    loggedUser: '',
  }

  handleFormSubmit = (user, password) => {
    sessionStorage.setItem('Parent-Ing_App_KS', password);
    sessionStorage.setItem('Parent-Ing_App_UId', user.id);
    sessionStorage.setItem('Parent-Ing_App_Un', user.username)
    this.setState({loggedUser: user})
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
            <img className='img-fluid d-sm-block mx-auto' src={Logo} alt='app logo'/>
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
