import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const signIn = (e) => {
    e.preventDefault();

    if (email.endsWith('@mavs.uta.edu')) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setSuccessMessage(`Successfully logged in with email: ${email}`);
          setErrorMessage('');

          // Call the login function from AuthContext
          login(userCredential.user);

          // Redirect to the services page upon successful sign-in
          navigate("/service");
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage('Invalid email or password.');
          setSuccessMessage('');
        });
    } else {
      setErrorMessage('Invalid email. Login with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
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
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignIn;
