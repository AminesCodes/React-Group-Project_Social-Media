/*
Events Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';

// import './Events.css';

export default class Events extends PureComponent {
  pw = sessionStorage.getItem('Suit_App_KS');
  uId = sessionStorage.getItem('Suit_App_UId');
  state = {

  }

  
  // ################ RENDER ###########
  render() {
    return (
      <>
      Welcome to the Events Page.
      </>
    );
  }
}
