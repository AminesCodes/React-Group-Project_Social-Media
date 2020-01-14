/*
AboutSA Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';

// import './AboutSA.css';

export default class AboutSA extends PureComponent {
  pw = sessionStorage.getItem('Parent-Ing_App_KS');
  uId = sessionStorage.getItem('Parent-Ing_App_UId');
  state = {

  }

  
  // ################ RENDER ###########
  render() {
    return (
      <>
      Welcome to the About SuitApp Page.
      </>
    );
  }
}
