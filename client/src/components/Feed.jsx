import React, { PureComponent } from 'react';

export default class Feed extends PureComponent {
  pw = sessionStorage.getItem('Parent-Ing_App_KS');
  uId = sessionStorage.getItem('Parent-Ing_App_UId');
  state = {

  }

  // ############## RENDER ################
  render() {
    return (
      <p>FEED | Home page: {this.pw}, {this.uId}</p>
    )
  }
}
