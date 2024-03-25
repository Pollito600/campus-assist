import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleSignUp = (e) => {
    e.preventDefault();

    if (email.endsWith('@mavs.uta.edu')) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);

          // Send email verification
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Verification email sent");
    
              // Provide a message about email verification
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

          // Call the login function from AuthContext
          login(userCredential.user);

          // Redirect to the LogIn page upon successful sign-up
          navigate("/login");
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
// Visual message to request email and password to create account
  return (
    <div className="sign-in-container">
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
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
