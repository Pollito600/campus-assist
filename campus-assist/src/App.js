// src/App.js
import './App.css';
import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      {/* Creating Routes to redirect to different pages */}
      <Router> 
        <Navbar />
        <Routes>
        
          <Route path="/" exact element={<Home />} ></Route>
          <Route path="/service" exact element={<Service />} ></Route>
          <Route path="/about" exact element={<About />} ></Route>
          <Route path="/contact" exact element={<Contact />} ></Route>
          <Route path="/signup" exact element={<SignUp />} ></Route>
          <Route path="/login" exact element={<SignIn />} ></Route>
        
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
