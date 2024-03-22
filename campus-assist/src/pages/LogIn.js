import React from 'react';
import SignIn from './components/auth/SignIn';
import AuthDetails from './components/AuthDetails';
import logo from './assets/logo2_1.png';
import './App.css';

class LogIn extends React.Component {
  componentDidCatch(error) {
    // Handle the error or log it for debugging
    console.error(error);
    // You can also display a fallback UI or redirect to an error page
    // this.setState({ hasError: true });
  }

  render() {
    return (
      <div className="LogIn">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>CAMPUS-ASSIST</p>
          {/* calling SignIn from SignIn component*/}
          <SignIn /> 
          <AuthDetails />
          <p></p>
        </header>
      </div>
    );
  }
}

export default LogIn;
