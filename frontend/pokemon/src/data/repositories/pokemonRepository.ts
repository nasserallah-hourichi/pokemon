import { PokemonEntity } from '../../domain/entities/PokemonEntity';
import { TeamEntity } from '../../domain/entities/TeamEntity';
import { IPokemonDataSource } from '../datasources/PokemonDataSourceImpl';
import { PokemonModel } from '../models/pokemon';

export interface IPokemonRepository {
  getPokemons(): Promise<PokemonModel[]>;
  getPokemonById(id: number): Promise<PokemonModel | null>;
}

export class PokemonRepositoryImpl implements IPokemonRepository {
  constructor(private dataSource: IPokemonDataSource) {}

  /** Convert a PokemonModel (from DB) into a PokemonEntity (domain) */
  private mapModelToEntity(model: PokemonModel): PokemonModel {
    return {
      id: model.id,
      name: model.name,
      image: model.image,
      life: model.life,
      power: model.power,
      type: model.type,       
    };
  }

  /** Converts a team id + name + ids into a TeamEntity */
  private mapIdToTeamEntity(id: number, name: string, pokemonIds: number[] = []): TeamEntity {
    return { id, name, pokemonIds };
  }

  async getPokemons(): Promise<PokemonModel[]> {
    try {
      const models = await this.dataSource.getPokemons();
      console.log(models)
      return models;
    } catch (error) {
      console.error('Repository Error (getPokemons):', error);
      throw error;
    }
  }

  async getPokemonById(id: number): Promise<PokemonModel | null> {
    try {
      const model = await this.dataSource.getPokemonById(id);
      return model ? this.mapModelToEntity(model) : null;
    } catch (error) {
      console.error(`Repository Error (getPokemonById - ID: ${id}):`, error);
      throw error;
    }
  }
}
