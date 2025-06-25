import { Battle } from "./battle";
import { PokemonModel } from "./pokemon";

export interface War {
    id: string;
    favoriteTeam: PokemonModel[];
    opponentTeam: PokemonModel[];
    battles: Battle[];
    winner?: 'favorite' | 'opponent' | null;
    isFinished: boolean;
  }