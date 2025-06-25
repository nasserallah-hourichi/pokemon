import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import MainPage from './pages/mainpage/MainPage';

function Header() {
  const location = useLocation();

  return (
    <header className="py-4 bg-primary text-white shadow-sm d-flex justify-content-between align-items-center px-4">
      <h1 className="mb-0">Pokemon App Challenge</h1>
      {location.pathname !== '/main' && (
        <Link to="/main">
          <Button variant="light">Go to Main Page</Button>
        </Link>
      )}
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App min-vh-100 d-flex flex-column">
        <Header />
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
