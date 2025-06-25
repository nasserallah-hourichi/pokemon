import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // This is where we'll define the black background
import HomePage from './pages/homepage/HomePage';
import {MainPage} from './pages/mainpage/MainPage';
import TestPage from './pages/TestPage';


function App() {
  return (
    <Router>
      {/* Removed bg-light here. The black background will come from App.css */}
      <div className="App min-vh-100 d-flex flex-column">
        <header className="py-4 bg-primary text-white shadow-sm d-flex justify-content-between align-items-center px-4">
          <h1 className="mb-0">Pokemon App Challenge</h1>
          <Link to="/main">
            <Button variant="light">Go to Main Page</Button>
          </Link>
        </header>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </main>

        <footer className="py-3 bg-dark text-white-50 text-center mt-auto">
          <p>&copy; 2025 Pokemon App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;