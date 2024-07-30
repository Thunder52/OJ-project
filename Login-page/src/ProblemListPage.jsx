import React, { useState, useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Filter from './Components/Filter';
import { AuthContext } from './AuthContext';



const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const {auth}=useContext(AuthContext);

  const navigate = useNavigate();

const token = localStorage.getItem('token');
if (!token) {
  navigate('/');
} 



  useEffect(() => {
    const fetchProblemList = async () => {
      try {
        const response = await axios.get('http://13.233.90.66:8000/api/problems');
        setProblems(response.data);
        setFilteredProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblemList();
  }, []);

  useEffect(() => {
    if (selectedTopic === 'All') {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(problems.filter(problem => problem.topic === selectedTopic));
    }
  }, [selectedTopic, problems]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://13.233.90.66:8000/api/problems/${id}`);
      setProblems(problems.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleFilterChange = (topic) => {
    setSelectedTopic(topic);
  };
  console.log(auth);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        {auth&&auth.role==='admin' && (
        <div className="flex justify-between mb-4">
          <Link to="/create-problem" className="bg-blue-500 text-white px-4 py-2 rounded">Create Problem</Link>
        </div>
        )}
        <Filter selectedTopic={selectedTopic} onFilterChange={handleFilterChange} />
        <table className="min-w-full bg-white mx-auto">
          <thead>
            <tr>
              <th className="py-2 text-center">#</th>
              <th className="py-2 text-center">Name</th>
              <th className="py-2 text-center">Topic</th>
              <th className="py-2 text-center">Difficulty</th>
              {auth && auth.role==='admin' &&(
              <th className="py-2 text-center">Actions</th>
            )}
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem, index) => (
              <tr key={problem._id} className="border-b">
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">
                  <Link to={`/problems/${problem._id}`} className="text-blue-500 underline">
                    {problem.name}
                  </Link>
                </td>
                <td className="py-2 text-center">{problem.topic}</td>
                <td className="py-2 text-center">{problem.difficulty}</td>
                {auth && auth.role==='admin' && (
                <td className="py-2 text-center">
                  <Link to={`/update-problem/${problem._id}`} className='bg-yellow-500 text-white px-2 py-1 rounded ml-2'>Update</Link>
                  <button onClick={() => handleDelete(problem._id)} className='bg-red-500 text-white px-2 py-1 rounded ml-2'>Delete</button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemListPage;
