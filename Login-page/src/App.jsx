import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProblemListPage from './ProblemListPage';
import AddProblem from './Components/AddProblem';
import UpdateProblem from './Components/UpdateProblem';
import ProblemSolve from './Components/ProblemSolve';
import ProblemSolvingPage from './Components/ProblemSolvingPage';
import CreateProblemPage from './Components/CreateProblemPage';
// import ProfilePage from './Components/profilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/problem-list" element={<ProblemListPage />} />
        <Route path="/problems/:id" element={<ProblemSolvingPage/>}/>
        <Route path="/create-problem"element={<CreateProblemPage/>}/>
        <Route path="/update-problem/:id"element={<UpdateProblem/>}/>
        {/* <Route path="/add-problem" element={<AddProblem />} />
        <Route path="/update-problem/:id" element={<UpdateProblem />} /> */}
        {/* <Route path="/problems/:id" element={<ProblemSolve/>}/> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;