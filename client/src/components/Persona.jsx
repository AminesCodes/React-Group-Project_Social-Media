/*
Persona Component | Client | SUITAPP Web App
GROUP 1: Amine Bensalem, Douglas MacKrell, Savita Madray, Joseph P. Pasaoa
*/


import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';

// import './Persona.css';

export default class Persona extends PureComponent {
  pw = sessionStorage.getItem('Parent-Ing_App_KS');
  uId = sessionStorage.getItem('Parent-Ing_App_UId');
  state = {

  }

  
  // ################ RENDER ###########
  render() {
    return (
      <>
      Welcome to the Persona Page.
      </>
    );
  }
}
