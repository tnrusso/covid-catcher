
import React, { useState } from 'react';
import { GoogleButton } from './GoogleButton';
import { Stats } from './Stats';
import { Socket } from './Socket';

export function Login() {
  const [loggedIn, setLoggedIn] = useState([]);

  // if you get the OK from server, render chat screen in <Input />
  function newUser() {
    React.useEffect(() => {
      Socket.on('new user', (data) => {
        setLoggedIn(data['login']);
      });
      return () => Socket.off('new user');
    });
  }

  newUser();

  if (loggedIn === 1) {
    return (
      <div>
        <Stats />
      </div>
    );
  }
else{
  return (
    <div>
      <h1>Please Login with Google</h1>
      <GoogleButton />
    </div>
  );
  
}
  
}
