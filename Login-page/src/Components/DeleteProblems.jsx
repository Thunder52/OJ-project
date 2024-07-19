import React from 'react';
import { deleteProblem } from '../Service/api';

const DeleteProblem = ({ problemId }) => {
  const handleDelete = async () => {
    try {
      await deleteProblem(problemId);
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteProblem;
