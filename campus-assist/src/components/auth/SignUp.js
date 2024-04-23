// SignUp.js

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";
import '../../styles/SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSignUp = (e) => {
    e.preventDefault();

    if (email.endsWith('@mavs.uta.edu')) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Update user profile with first and last name
          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
          }).then(() => {
            console.log("Profile updated successfully.");
          }).catch((error) => {
            console.log("Error updating profile:", error);
          });

          // Send email verification
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setSuccessMessage(
                "Verification email sent. Please check your inbox to verify your account."
              );
            })
            .catch((error) => {
              console.log("Error sending verification email:", error);
              setErrorMessage(
                "Failed to send verification email. Please try again later."
              );
            });
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('An account with this email already exists. Please log in.');
          } else {
            setErrorMessage('Failed to sign up. Please try again later.');
          }
          setSuccessMessage('');
        });
    } else {
      setErrorMessage('Invalid email. Sign up with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSignUp}>
        <h1>Create an Account</h1>
        <input
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ color: 'black' }}
        />
        <input
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ color: 'black' }}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ color: 'black' }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ color: 'black' }}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignUp;
