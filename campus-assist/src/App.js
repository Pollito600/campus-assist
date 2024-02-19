// src/App.js
import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import logo from './logo2_1.png';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <p>CSE 3311 - TEAM 7 - ITERATION 1</p>
        <br />
        <p>CAMPUS-ASSIST</p>          
        <SignIn/>
        <SignUp/>
        <AuthDetails/>
        <p></p>

      </header>
    </div>
  );
}

export default App;
