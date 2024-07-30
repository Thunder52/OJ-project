import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role');
    navigate('/'); 
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AlgoArena</h1>
        <div>
          {/* <Link to="/profile" className="mr-4">Profile</Link> */}
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;