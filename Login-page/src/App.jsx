import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProblemListPage from './ProblemListPage';
import AddProblem from './Components/AddProblem';
import UpdateProblem from './Components/UpdateProblem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problem-list" element={<ProblemListPage />} />
        <Route path="/add-problem" element={<AddProblem />} />
        <Route path="/update-problem/:id" element={<UpdateProblem />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;