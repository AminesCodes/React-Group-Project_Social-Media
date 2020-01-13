import React, { PureComponent } from 'react';

export default class Feed extends PureComponent {
  pw = sessionStorage.getItem('Parent-Ing_App_KS');
  uId = sessionStorage.getItem('Parent-Ing_App_UId');


  // ############## RENDER ################
  render() {
    return (
      <p>Home page: {this.pw}, {this.uId}</p>
    )
  }
}
