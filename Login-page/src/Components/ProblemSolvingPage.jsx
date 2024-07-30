import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import Header from './Header';

const ProblemSolvingPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    return 0;
}`);
  const [language, setLanguage] = useState('cpp');
  const [results, setResults] = useState([]);
  const [allPassed, setAllPassed] = useState(null);

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://13.233.172.127:5000/run/${id}`, {
        code,
        language
      });
      setResults(response.data.results);
      setAllPassed(response.data.allPassed);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <Header/>
    <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row items-stretch h-screen">
      <div className="lg:w-1/2 lg:pr-4 mb-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Problem Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 flex-grow overflow-auto">
          <h2 className="text-xl font-bold mb-2">{problem.name}</h2>
          <p className="text-gray-700 mb-2"><strong>Difficulty:</strong> {problem.difficulty}</p>
          <p className="text-gray-700 mb-2"><strong>Topic:</strong> {problem.topic}</p>
          <p className="text-gray-700 mb-4"><strong>Statement:</strong></p>
          <p className="text-gray-700 mb-4">{problem.statement}</p>
          {problem.testcases && problem.testcases.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Example Test Case</h3>
              <p className="text-gray-700"><strong>Input:</strong></p>
              <p className="text-gray-700 mb-2">{problem.testcases[0].input}</p>
              <p className="text-gray-700"><strong>Output:</strong></p>
              <p className="text-gray-700">{problem.testcases[0].output}</p>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-1/2 lg:pl-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Code Editor</h1>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-1/2"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="bg-gray-800 shadow-lg rounded-lg mb-4 p-4 flex-grow overflow-auto">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              outline: 'none',
              border: 'none',
              backgroundColor: '#1e293b',
              color: '#f8f8f2',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full text-center mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 text-white font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit
        </button>
        <div className="mt-4">
          {allPassed !== null && (
            <div className={`p-4 rounded ${allPassed ? 'bg-green-100' : 'bg-red-100'}`}>
              {allPassed ? 'All test cases passed!' : 'Some test cases failed.'}
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Result</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index} className="mb-2">
                  <strong>Test Case:</strong> {result.testCase} - <strong>Result:</strong> {result.result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProblemSolvingPage;
