//SignUp Page
// src/App.js
import React from 'react';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import logo from './assets/logo2_1.png';
import './App.css';


function SignUp() {
  return (
    <div className="signup">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CAMPUS-ASSIST</p>          
        <SignUp/>
        <AuthDetails/>
        <p></p>

      </header>
    </div>
  );
}

export default SignUp;
