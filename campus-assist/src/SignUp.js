// src/SignUp.js
import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = () => {
    if (email.endsWith('@mavs.uta.edu')) {
      // Perform sign up logic (could include API calls to a backend)
      setSuccessMessage(`Successfully signed up with email: ${email}`);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid email. Sign up with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default SignUp;

