import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import React from 'react';

import imgLogo from './images/logo.svg'

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  function handleFailure(result) {
    alert(result)
  }

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (

    <div className="App">

      <main className="content-wrapper">
        <h1>Nunca foi tão Simples Gerenciar Estagio</h1>

        <img src={imgLogo} alt="logo" />

      </main>
    
      <header className="App-header">

        
        <div id='login'>
        <h1>Faça o Login com sua Conta Google</h1>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Continue com o Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;