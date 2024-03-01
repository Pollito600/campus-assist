import React from "react";
import MultipleStudents from "../assets/UTA students1.png";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultipleStudents})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
            Description: 
            Campus-Assist is a web based platform  for university students to seek and assist fellow peers with common household services and chores.
        </p>
        <p>
            Vision:
            Redefine the college experience through an innovative, community-oriented platform that becomes every student's instinctive choice when seeking assistance

        </p>
      </div>
    </div>
  );
}

export default About;
