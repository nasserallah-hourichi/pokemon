import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div className="App bg-light min-vh-100">
      <header className="py-4 bg-primary text-white shadow-sm">
        <h1 className="text-center mb-0">Pokemon App Challenge</h1>
      </header>
      <main>
        <PokemonList />
      </main>
      <footer className="py-3 bg-dark text-white-50 text-center mt-5">
        <p>&copy; 2025 Pokemon App</p>
      </footer>
    </div>
  );
}

export default App;