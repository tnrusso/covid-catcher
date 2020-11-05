
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

export function GoogleButton() {
  
  const [message, setMessage] = useState('');
  
  function handleSuccess(response) {
    const name = response.profileObj.givenName;
    const email = response.profileObj.email;
    const pic = response.profileObj.imageUrl;
    Socket.emit('new google user', {
      'name': name,
      'email': email,
      'pic': pic,
      'room': Socket.id,
    });
  }

  function handleFailure(response) {
    setMessage('Failed to authenticate you. Please try again.');
  }
  
  return (
    <div>
    <GoogleLogin
      clientId="647618540134-q6v0kfdeo8od51bhlmv8l4uere8oemi6.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
    />
    <p>{message}</p>
    </div>
  );
}
