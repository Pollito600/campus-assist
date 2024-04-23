// Navbar.js

import React, { useState } from "react";
import Logo from "../assets/logo2_1.png";
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext';

import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { user } = useAuth(); // Access the user function from AuthContext

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} className="App-logo" alt="logo"/>
        {/* Show "Services" and "Logout" links when user is authenticated */}
        {user ? (
          <>
            <Link to="/service">Services </Link>
            <Link to="/logout">Logout</Link>
            <Link to="/account">Account</Link> {/* Add Account link */}
          </>
        ) : (
          <>{/* Show "LogIn" and "Signup" on left side if user hasn't log in */}
            <Link to="/login">LogIn </Link>
            <Link to="/signup">SignUp </Link>
          </>
        )}
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          {user ? (
            <>
              <Link to="/service"> Services </Link>
              <Link to="/logout"> Logout </Link>
              <Link to="/account"> Account </Link> {/* Add Account link */}
            </>
          ) : (
            <>
              <Link to="/about"> About </Link>
              <Link to="/contact"> Contact </Link>
              <Link to="/login"> LogIn </Link>
              <Link to="/signup"> SignUp </Link>
            </>
          )}
        </div>
      </div>
      <div className="rightSide"> {/* Show "Home, AboutUs, Contact Us, and Posts" links on right side of NavBar by default */}
        <Link to="/">Home </Link>
        <Link to="/about">About Us </Link>
        <Link to="/contact">Contact Us </Link>
        {user && <Link to="/posts">Posts </Link>} {/* Show Posts tab if user is authenticated */}
        <button onClick={toggleNavbar}></button>
      </div>
    </div>
  );
}

export default Navbar;
