import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/survey');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Our Survey</h1>
      <button onClick={handleStart}>Start Survey</button>
    </div>
  );
};

export default Welcome;
