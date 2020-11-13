import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

export function GoogleButton() {
  const [message, setMessage] = useState('');

  function handleSuccess(response) {
    setMessage('Thank you..');
    const name = response.profileObj.givenName;
    const { email } = response.profileObj;
    const pic = response.profileObj.imageUrl;
    Socket.emit('new google user', {
      name,
      email,
      pic,
      room: Socket.id,
    });
  }

  function handleFailure() {
    setMessage('Failed to authenticate you. Please try again.');
  }

  return (
    <div>
      <GoogleLogin
        clientId="477035920625-38n6lbf1m04mtpsfnvsiogmp4dlin790.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      />
      <p>{message}</p>
    </div>
  );
}
