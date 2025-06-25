import { useEffect, useState } from 'react';
import { pokemonService } from '../../dependencies/dependencies';
import { PokemonEntity } from '../../domain/entities/PokemonEntity';
import { PokemonModel } from '../../data/models/pokemon';

interface UsePokemonListResult {
  pokemon: PokemonModel[];
  loading: boolean;
  error: string | null;
}

export const usePokemonList = (): UsePokemonListResult => {
  const [pokemon, setPokemon] = useState<PokemonModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await pokemonService.getPokemons();
        setPokemon(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  return { pokemon, loading, error };
};