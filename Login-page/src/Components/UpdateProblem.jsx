import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    name: '',
    statement: '',
    topic: '',
    difficulty: '',
    hints: '',
    testcases: [{ input: '', output: '' }]
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://13.233.90.66:8000//api/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const newTestCases = [...problem.testcases];
    newTestCases[index][name] = value;
    setProblem({ ...problem, testcases: newTestCases });
  };

  const addTestCase = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      testcases: [...prevProblem.testcases, { input: '', output: '' }]
    }));
  };

  const removeTestCase = (index) => {
    const newTestCases = problem.testcases.filter((_, idx) => idx !== index);
    setProblem({ ...problem, testcases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/problems/${id}`, problem);
      navigate('/problem-list');
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Update Problem</h1>
      </header>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={problem.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Topic</label>
            <input
              type="text"
              name="topic"
              value={problem.topic}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Difficulty</label>
            <input
              type="text"
              name="difficulty"
              value={problem.difficulty}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hints</label>
            <input
              type="text"
              name="hints"
              value={problem.hints}
              onChange= {handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Test Cases</label>
            {problem.testcases.map((testcase, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="input"
                  placeholder="Input"
                  value={testcase.input}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="text"
                  name="output"
                  placeholder="Output"
                  value={testcase.output}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="button" onClick={() => removeTestCase(index)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
                  Remove Test Case
                </button>
              </div>
            ))}
            <button type="button" onClick={addTestCase} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">
              Add Test Case
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Statement</label>
            <textarea
              name="statement"
              value={problem.statement}
              onChange={handleChange}
              className="w-full p-4 border rounded h-40"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProblemPage;
