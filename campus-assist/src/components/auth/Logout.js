import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Logout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
      // Redirect to the home page after logout
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
  
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h1>You are logged in as: {user.email}</h1>
          {/* Optionally include other user information */}
          <button type="submit" onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <h1>You are not logged in.</h1>
          {/* Optionally include a message or other content here */}
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  );
};

export default Logout;
