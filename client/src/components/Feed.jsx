import React from 'react';

export default class Home extends React.PureComponent {
    pw = sessionStorage.getItem('Parent-Ing_App_KS')
    uId = sessionStorage.getItem('Parent-Ing_App_UId')

    //############## RENDER ################
    render() {
        return (
            <p>Home page: {this.pw}, {this.uId}</p>
        )
    }
}