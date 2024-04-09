import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/AdobeStock1.jpeg";
import "../styles/Home.css";

function Home() {
  return (
   
    /* Creating background image in home page and button to redirect to LogIn page */

   <div className="home" style={{ backgroundImage: `url('${BannerImage}')` }}>
      <div className="headerContainer">
        <h1> Campus-Assist </h1>
        <p> Friends to help and help to get friends</p>
        <Link to="/login">
          <button> LOG IN </button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/signup">
          <button> SIGN UP </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
