import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblemList = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/problems');
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblemList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/problems/${id}`);
      setProblems(problems.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4">
            <Link to="/create-problem" className="bg-blue-500 text-white px-4 py-2 rounded">Create Problem</Link>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">Name</th>
                <th className="py-2">Topic</th>
                <th className="py-2">Difficulty</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={problem._id} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <Link to={`/problems/${problem._id}`} className="text-blue-500 underline">
                      {problem.name}
                    </Link>
                  </td>
                  <td className="py-2">{problem.topic}</td>
                  <td className="py-2">{problem.difficulty}</td>
                  <td className="py-2">
                    <Link to={`/update-problem/${problem._id}`} className='bg-yellow-500 text-white px-2 py-1 rounded ml-2'>Update</Link>
                    <button onClick={() => handleDelete(problem._id)} className='bg-red-500 text-white px-2 py-1 rounded ml-2'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ProblemListPage;



