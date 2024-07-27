import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './Service/api';
// import { AuthContext } from './AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // const {login}=useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

   const userData={name,email,password};
   console.log('Submitting userData:', userData);

    try {
      const response = await registerUser(userData);
      console.log('Registration Successfull' ,response);
      navigate('/');
      }
     catch (error) {
      console.log("Registration failed",error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ flex: '1 1 60%' }} className="flex w-full h-screen justify-center items-center">
      <div className="w-full h-screen items-center content-center bg-[url(./assets/Coding.jpg)]">
        <h1 className="text-center flex justify-center text-8xl font-bold text-white">AlgoArena</h1>
      </div>
      <div style={{ flex: '1 1 40%' }} className="h-screen w-full flex items-center justify-center bg-cyan-500">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required
                className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <Link
                to="/login"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;