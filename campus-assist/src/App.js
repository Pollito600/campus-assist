// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/AuthContext'; // Import the AuthProvider
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Service from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Logout from './components/auth/Logout';
import Request from './pages/Request';
//import Posts from './pages/Posts';

function App() {
  return (
    <div className="App">
      {/* Wrap application with AuthProvider for authentication */}
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes> {/* Creating routes to all the pages */}
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/requestservice" element={<Request />} />
            {/*<Route path="/posts" element={<Posts />} />*/}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
