import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/UTA students3.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Campus-Assist </h1>
        <p> Friends to help and help to get friends</p>
        <Link to="/login">
          <button> LOG IN </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
