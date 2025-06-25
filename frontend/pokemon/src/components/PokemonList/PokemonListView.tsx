import React from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { PokemonEntity } from '../../domain/entities/PokemonEntity';
import { PokemonModel } from '../../data/models/pokemon';

interface PokemonListViewProps {
  pokemon: PokemonModel[];
  loading: boolean;
  error: string | null;
}

export const PokemonListView: React.FC<PokemonListViewProps> = ({ pokemon, loading, error }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 100px)' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading Pokemons...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">
          <h3>Oh no! An error occurred:</h3>
          <p>{error}</p>
          <p>Please check your Supabase connection and Row Level Security policies.</p>
        </Alert>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="container mt-5">
        <Alert variant="info">
          <h3>No Pokemons found!</h3>
          <p>It seems your 'pokemon' table in Supabase is empty or inaccessible.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Available Pokemons</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {pokemon.map((p) => (
          <div className="col" key={p.id}>
            <Card className="h-100 shadow-sm rounded-lg">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-primary fs-4 mb-2">{p.name}</Card.Title>
                <Card.Text className="text-muted mb-0">
                  <strong>Type:</strong> <span className="badge bg-info text-dark">{p.type}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};