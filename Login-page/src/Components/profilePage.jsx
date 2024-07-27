import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedCount] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/profile', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setUser(response.data.user);
  //       setSolvedCount(response.data.solvedCount);
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //       navigate('/'); // Redirect to login if there's an error
  //     }
  //   };

  //   fetchUserProfile();
  // }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Questions Solved:</strong> {solvedProblems}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;