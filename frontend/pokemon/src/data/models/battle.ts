import { PokemonModel } from "./pokemon";

export interface Battle {
    id: string;
    favoritePokemon: PokemonModel;
    opponentPokemon: PokemonModel;
    winner?: 'favorite' | 'opponent' | null;
    isFinished: boolean;
  }