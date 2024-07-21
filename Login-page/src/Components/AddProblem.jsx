import React, { useState } from 'react';
import { createProblem } from '../Service/api';
import { Link } from 'react-router-dom';

const AddProblem = () => {
  const [problem, setProblem] = useState({
    name: '',
    topic: '',
    describtion: '',
  });

  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      await createProblem(problem, token);
      setProblem({ name: '', topic: '', Describtion: '' });
    } catch (error) {
      console.error('Error creating problem:', error);
    }
  };

  return (
    <div>
      <h2>Add Problem</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Problem Name"
          value={problem.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={problem.topic}
          onChange={handleChange}
        />
        <input
          type="text"
          name="describtion"
          placeholder="describtion"
          value={problem.describtion}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProblem;
