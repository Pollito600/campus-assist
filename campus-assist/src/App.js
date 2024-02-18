// src/App.js
import React from 'react';
import Login from "./Login";
import logo from './logo2_1.png';
import './App.css';

function App() {
  const openSignUpWindow = () => {
    window.open('/signup', 'Signup', 'width=400,height=400');
  };

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <p>CSE 3311 - TEAM 7 - ITERATION 1</p>
        <br />
        <p>CAMPUS-ASSIST</p>          
        <Login />
        <p></p>
        <button onClick={openSignUpWindow}>
          Sign up
        </button>
      </header>
    </div>
  );
}

export default App;
