import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login'
import Register from './Register'
function App(){
  // const [count, setCount] = useState(0)
  // const router=createBrowserRouter([
  //   {
  //     path:"/",
  //     element:<Login/>
  //   },
  //   {
  //     path:"/Register",
  //     element:<Register/>
  //   },
  // ])

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
