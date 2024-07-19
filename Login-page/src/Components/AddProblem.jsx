import React, { useState } from 'react';
import { createProblem } from '../Service/api';

const AddProblem = () => {
  const [problem, setProblem] = useState({
    name: '',
    topic: '',
    Describtion: '',
  });

  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProblem(problem);
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
          name="Describtion"
          placeholder="Describtion"
          value={problem.Describtion}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProblem;
