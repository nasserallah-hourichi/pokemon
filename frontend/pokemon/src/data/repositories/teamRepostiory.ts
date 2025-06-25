import { PokemonEntity } from '../../domain/entities/PokemonEntity';
import { TeamEntity } from '../../domain/entities/TeamEntity';
import { IPokemonDataSource } from '../datasources/PokemonDataSourceImpl';
import { ITeamDataSource } from '../datasources/TeamDataSourceImpl';
import { PokemonModel } from '../models/pokemon';

export interface ITeamRepository {
  createTeam(teamName: string, pokemonIds: number[]): Promise<TeamEntity>;
  getFavoriteTeam(): Promise<TeamEntity>;
  updateTeam(teamId: number, teamName: string, pokemonIds: number[]): Promise<TeamEntity>;
}

export class TeamRepositoryImpl implements ITeamRepository {
  constructor(private dataSource: ITeamDataSource) {}

  private mapIdToTeamEntity(id: number, name: string, pokemonIds: number[] = []): TeamEntity {
    return {
      id,
      name,
      pokemonIds,
    };
  }

  async createTeam(teamName: string, pokemonIds: number[]): Promise<TeamEntity> {
    try {
      const newTeam = await this.dataSource.createTeam(teamName, pokemonIds);
      return this.mapIdToTeamEntity(newTeam.id, newTeam.name!, newTeam.pokemonIds);
    } catch (error) {
      console.error('Repository Error (createTeam):', error);
      throw error;
    }
  }

  async getFavoriteTeam(): Promise<TeamEntity> {
    try {
      const team = await this.dataSource.getFavoriteTeam();
      return this.mapIdToTeamEntity(team.id, team.name!, team.pokemonIds);
    } catch (error) {
      console.error('Repository Error (getFavoriteTeam):', error);
      throw error;
    }
  }

  async updateTeam(teamId: number, teamName: string, pokemonIds: number[]): Promise<TeamEntity> {
    try {
      const team = await this.dataSource.updateTeam(teamId, teamName, pokemonIds);
      return this.mapIdToTeamEntity(team.id, team.name!, team.pokemonIds);
    } catch (error) {
      console.error(`Repository Error (updateTeam - ID: ${teamId}):`, error);
      throw error;
    }
  }
}
