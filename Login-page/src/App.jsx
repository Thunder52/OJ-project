import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login'
import Register from './Register'
function App(){

  return (
    <>
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} /> {/* Default route */}
    </Routes>
  </Router>
  </>
  );
};
export default App;
