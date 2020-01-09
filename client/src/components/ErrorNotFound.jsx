import React from 'react';
import NotFoundImage from '../media/404-Not_Found.jpg'

export default function ErrorNotFound() {
    return(
        <img className='img-fluid d-sm-block mx-auto' src={NotFoundImage} alt='404 Error' width='90%'/>
    )
}