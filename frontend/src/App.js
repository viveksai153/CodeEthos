import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import './App.css';

import CodeReview from './pages/CodeReview';
import HomePage from './pages/HomePage';
import CodeReviewForm from './pages/CodeReviewForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* <Route path="/register" element={<Register/>}/> */}
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/codereview" element={<CodeReview/>}/>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviewform" element={<CodeReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
