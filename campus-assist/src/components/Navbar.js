
import React, { useState } from "react";
import Logo from "../assets/logo2_1.png";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} className="App-logo" alt="logo"/>
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/service"> Services </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
          <Link to="/login"> LogIn </Link>
          <Link to="/signup"> SignUp </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/service"> Services </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/login"> LogIn </Link>
        <Link to="/signup"> SignUp </Link>

        <button onClick={toggleNavbar}>
          
        </button>
      </div>
    </div>
  );
}

export default Navbar;
