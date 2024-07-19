import React, { useState, useEffect } from 'react';
import { fetchProblemById, updateProblem } from '../Service/api';

const UpdateProblem = ({ match }) => {
  const [problem, setProblem] = useState({
    name: '',
    statement: '',
    difficulty: '',
    hints: ''
  });

  useEffect(() => {
    const getProblem = async () => {
      try {
        const data = await fetchProblemById(match.params.id);
        setProblem({
          name: data.name,
          statement: data.statement,
          difficulty: data.difficulty,
          hints: data.hints
        });
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    getProblem();
  }, [match.params.id]);

  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProblem(match.params.id, problem);
      alert("Problem updated successfully!");
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  return (
    <div>
      <h2>Update Problem</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Problem Name"
          value={problem.name}
          onChange={handleChange}
        />
        <textarea
          name="statement"
          placeholder="Problem Statement"
          value={problem.statement}
          onChange={handleChange}
        />
        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty"
          value={problem.difficulty}
          onChange={handleChange}
        />
        <input
          type="text"
          name="hints"
          placeholder="Hints"
          value={problem.hints}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProblem;
