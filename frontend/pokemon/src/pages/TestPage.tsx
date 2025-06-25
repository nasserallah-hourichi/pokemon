import React from 'react';
import PokemonBattleCard from '../components/PokemonBattleCard';

const TestPage: React.FC = () => {
  const samplePokemon = {
    id: 25,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    health: 100,
    attack: 55,
  };

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <PokemonBattleCard
        id={samplePokemon.id}
        name={samplePokemon.name}
        image={samplePokemon.image}
        health={samplePokemon.health}
        attack={samplePokemon.attack}
      />
    </div>
  );
};

export default TestPage;
