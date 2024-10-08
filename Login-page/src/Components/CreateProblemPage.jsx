import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProblemPage = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    name: '',
    statement: '',
    topic: '',
    difficulty: '',
    hints: '',
    testcases: [{ input: '', output: '' }]
  });

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
      await axios.post('http://43.204.157.96:8000/api/problems', problem);
      navigate('/problem-list');
    } catch (error) {
      console.error('Error creating problem:', error);
    }
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Create Problem</h1>
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
              // required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hints</label>
            <input
              type="text"
              name="hints"
              value={problem.hints}
              onChange={handleChange}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProblemPage;
