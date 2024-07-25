import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const ProblemSolvePage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

// Define the main function
int main() {
    // Declare variables
    int num1, num2, sum;
    // Prompt user for input
    cin >> num1 >> num2;
    // Calculate the sum
    sum = num1 + num2;
    // Output the result
    cout << "The sum of the two numbers is: " << sum;
    // Return 0 to indicate successful execution
    return 0;
}`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [allPassed, setAllPassed] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/problems/${id}`);
        setProblem(response.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const payload = { code, language: 'cpp' };
      const { data } = await axios.post(`http://localhost:8000/api/run/${id}`, payload);
      setTestResults(data.results);
      setAllPassed(data.allPassed);
      if (data.allPassed) {
        // Update user solved problems in local storage
        const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems')) || [];
        if (!solvedProblems.includes(id)) {
          solvedProblems.push(id);
          localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row items-stretched">
      <div className="lg:w-1/2 lg:pr-4 mb-4">
        <h1 className="text-3xl font-bold mb-3">Problem Details</h1>
        <div className="bg-white shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{problem.name}</h2>
          <p className="text-gray-700 mb-2"><strong>Difficulty:</strong> {problem.difficulty}</p>
          <p className="text-gray-700 mb-2"><strong>Topic:</strong> {problem.topic}</p>
          <p className="text-gray-700 mb-4"><strong>Statement:</strong> {problem.statement}</p>
          {problem.testcases && problem.testcases.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Example Test Case</h3>
              <p className="text-gray-700"><strong>Input:</strong> {problem.testcases[0].input}</p>
              <p className="text-gray-700"><strong>Output:</strong> {problem.testcases[0].output}</p>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-1/2 lg:pl-8">
        <h1 className="text-3xl font-bold mb-3">Code Editor</h1>
        <div className="bg-gray-500 shadow-md mb-4" style={{ height: '300px', overflowY: 'auto' }}>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 'none',
              border: 'none',
              backgroundColor: '#f7fafc',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full text-center mt-4 bg-gradient-to-br from-blue-800 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-black font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 inline-block align-middle me-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
          </svg>
          Run
        </button>
        <div className="mt-4">
          {testResults.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Test Results</h2>
              {testResults.map((result, index) => (
                <p key={index} className={`mb-1 ${result.result.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  Test Case {index + 1}: {result.result}
                </p>
              ))}
            </div>
          )}
          {allPassed !== null && (
            <div className={`text-lg font-semibold ${allPassed ? 'text-green-500' : 'text-red-500'}`}>
              {allPassed ? 'All test cases passed!' : 'Some test cases did not pass.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;