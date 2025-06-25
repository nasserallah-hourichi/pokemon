import { supabase } from '../../config/supabase';
import { PokemonModel } from '../models/pokemon';

export interface IPokemonDataSource {
  getPokemons(): Promise<PokemonModel[]>;
  getPokemonById(id: number): Promise<PokemonModel | null>;
  getPokemonWithWeaknessesById(id: number): Promise<PokemonModel | null>;
}

export class PokemonDataSourceImpl implements IPokemonDataSource {
  async getPokemons(): Promise<PokemonModel[]> {
    const { data, error } = await supabase.from('pokemon').select('*');
    if (error) {
      console.error('Data Source Error (getPokemons):', error);
      throw new Error(`Failed to fetch Pokemons: ${error.message}`);
    }
    return (data || []) as PokemonModel[];
  }

  async getPokemonById(id: number): Promise<PokemonModel | null> {
    const { data, error } = await supabase.from('pokemon').select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') {
      console.error(`Data Source Error (getPokemonById - ID: ${id}):`, error);
      throw new Error(`Failed to fetch Pokemon by ID: ${error.message}`);
    }
    return (data || null) as PokemonModel | null;
  }

  async getPokemonWithWeaknessesById(id: number): Promise<PokemonModel | null> {
    const { data: pokemonData, error: pokemonError } = await supabase
      .from('pokemon')
      .select(`
        id,
        name,
        image,
        life,
        power,
        type: type_id
      `)
      .eq('id', id)
      .single();
  
    if (pokemonError) {
      console.error('Error fetching Pokemon:', pokemonError);
      return null;
    }
  
    const typeObj = Array.isArray(pokemonData.type) && pokemonData.type.length > 0
      ? pokemonData.type[0]
      : null;
  
    let weaknessesData: any[] = [];
    let weaknessesError = null;
    if (typeObj) {
      const res = await supabase
        .from('weakness')
        .select(`
          id,
          type2,
          factor,
          type2_name: pokemon_type(name)
        `)
        .eq('type1', typeObj.id);
  
      weaknessesData = res.data || [];
      weaknessesError = res.error;
    }
  
    if (weaknessesError) {
      console.error('Error fetching weaknesses:', weaknessesError);
    }
  
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.image,
      life: pokemonData.life,
      power: pokemonData.power,type:pokemonData.type
    };
  }
}