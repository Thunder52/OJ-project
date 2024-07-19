import React from 'react';
import ProblemItem from './ProblemItem';

const ProblemPage = ({ problems }) => {
  return (
    <div className="mt-4">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">#</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Topic</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <ProblemItem key={problem.id} problem={problem} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemPage;
