import React, { useState, useEffect } from 'react';
import ProblemPage from './Components/ProblemPage';
import Filter from './Components/Filter';
import Header from './Components/Header';
import { fetchProblems, deleteProblem } from './Service/api';
import { useNavigate } from 'react-router-dom';

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [Describtion,setDescribtion]=useState('');
  const navigate=useNavigate();

  const problemsData={problems,Describtion};

  useEffect(() => {
    const fetchProblemList = async () => {
      try {
        const problemsData = await fetchProblems();
        setProblems(problemsData);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblemList();
  }, []);

  const handleFilterChange = (topic) => {
    setSelectedTopic(topic);
  };
  const handleAddProblem = () => {
    navigate('/add-problem');
  };

  const handleDeleteProblem = async (id) => {
    try {
      await deleteProblem(id);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleUpdateProblem = (id) => {
    navigate(`/update-problem/${id}`);
  };

  const filteredProblems = selectedTopic === 'All'
    ? problems
    : problems.filter(problem => problem.topic === selectedTopic);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
          <Filter selectedTopic={selectedTopic} onFilterChange={handleFilterChange} />
          <button
            onClick={handleAddProblem}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Problem
          </button>
        </div>
        <ProblemPage 
          problems={filteredProblems} 
          onDelete={handleDeleteProblem} 
          onUpdate={handleUpdateProblem} 
        />
      </div>
    </div>
  );
};

export default ProblemListPage;
