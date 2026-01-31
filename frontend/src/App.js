import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Features from './pages/Features';
import Publications from './pages/Publications';
import UseCases from './pages/UseCases';
import Visualization from './pages/Visualization';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;