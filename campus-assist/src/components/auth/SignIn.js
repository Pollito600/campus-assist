import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import sendPasswordResetEmail from Firebase
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetEmail, setResetEmail] = useState(''); // State for reset email
  const [showResetForm, setShowResetForm] = useState(false); // State for showing reset form

  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const signIn = (e) => {
    e.preventDefault();
    // Verify email comes from @mavs.uta.edu
    if (email.endsWith('@mavs.uta.edu')) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Check if email is verified
          if (user.emailVerified) {
            // Email is verified, proceed with login
            console.log(userCredential);
            setSuccessMessage(`Successfully logged in with email: ${email}`);
            setErrorMessage('');

            // Call the login function from AuthContext
            login(user);

            // Redirect to the services page upon successful sign-in
            navigate('/service');
          } else {
            // Email is not verified
            setErrorMessage('Please verify your email before logging in.');
            setSuccessMessage('');
          }
        })
        .catch(() => { // Removed unused 'error' variable
          setErrorMessage('Invalid email or password.');
          setSuccessMessage('');
        });
    } else {
      setErrorMessage('Invalid email. Login with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
  };

  const handleForgotPassword = () => {
    setShowResetForm(true);
  };

  const sendResetPasswordEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetEmail) // Use sendPasswordResetEmail function from Firebase
      .then(() => {
        setSuccessMessage('Password reset email sent. Check your inbox.');
        setErrorMessage('');
        setShowResetForm(false);
      })
      .catch(() => { // Removed unused 'error' variable
        setErrorMessage('Error sending password reset email.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="sign-in-container"> 
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
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
        <button type="submit">Log In</button>
        <button type="button" onClick={handleForgotPassword}>Forgot Password?</button>
      </form>
      {showResetForm && (
        <form onSubmit={sendResetPasswordEmail}>
          <input
            type="email"
            placeholder="Enter your email to reset password"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)} // Handle input change for reset email
            style={{ color: 'black' }}
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignIn;
