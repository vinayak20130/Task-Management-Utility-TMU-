import React from 'react';
import './App.css';
import Notes from './pages/Notes';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const onLogoutSuccess = () => {
    console.log('Logout made successfully');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <h2>Google Login in React</h2>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
        />
        <button onClick={() => googleLogout()}>Logout</button>
        <Notes />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
