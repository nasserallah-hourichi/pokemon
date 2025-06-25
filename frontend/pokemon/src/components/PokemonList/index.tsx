import React from 'react';
import { usePokemonList } from './usePokemonList';
import { PokemonListView } from './PokemonListView';

const PokemonList: React.FC = () => {
  const { pokemon, loading, error } = usePokemonList();

  return (
    <PokemonListView
      pokemon={pokemon}
      loading={loading}
      error={error}
    />
  );
};

export default PokemonList;