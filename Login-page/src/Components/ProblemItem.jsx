import React from 'react';

const ProblemItem = ({ problem, index }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">
        <a href={problem.link} className="text-blue-600 hover:underline">{problem.name}</a>
      </td>
      <td className="py-2 px-4 border-b">{problem.topic}</td>
    </tr>
  );
};

export default ProblemItem;