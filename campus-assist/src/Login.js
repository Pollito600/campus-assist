// Login.js
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = () => {
    if (email.endsWith('@mavs.uta.edu')) {
      // Perform login logic (could include API calls to a backend)
      setSuccessMessage(`Successfully logged in with email: ${email}`);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid email. Login with @mavs.uta.edu email only.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Campus-Assist</h2>
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
      <button onClick={handleLogin}>Login</button>
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Login;
