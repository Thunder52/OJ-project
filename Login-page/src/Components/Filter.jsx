import React from 'react';

const Filter = ({ selectedTopic, onFilterChange }) => {
  const topics = ['All', 'dp', 'brute force', 'greedy','Arrays','String'];

  return (
    <div className="mb-4">
      <label htmlFor="topic-filter" className="mr-2">Filter by topic:</label>
      <select
        id="topic-filter"
        value={selectedTopic}
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        {topics.map(topic => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
