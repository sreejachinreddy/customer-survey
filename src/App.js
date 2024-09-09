import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Survey from './Survey';
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/survey" element={<Survey />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
