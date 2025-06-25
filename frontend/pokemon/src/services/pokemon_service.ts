import { PokemonModel } from '../data/models/pokemon';
import { IPokemonRepository } from '../data/repositories/pokemonRepository';

export class PokemonService {
  constructor(private repository: IPokemonRepository) {}

  async getPokemons(): Promise<PokemonModel[]> {
    return this.repository.getPokemons();
  }

  async getPokemonById(id: number): Promise<PokemonModel | null> {
    return this.repository.getPokemonById(id);
  }

}
