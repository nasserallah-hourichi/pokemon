import { ITeamRepository } from '../data/repositories/teamRepostiory';
import { TeamEntity } from '../domain/entities/TeamEntity';

export class TeamService {
  constructor(private repository: ITeamRepository) {}

  async getFavoriteTeam(): Promise<TeamEntity> {
    return this.repository.getFavoriteTeam();
  }

  async createFavoriteTeam(teamName: string, pokemonIds: number[]): Promise<TeamEntity> {
    if (pokemonIds.length === 0) {
      throw new Error('Team must contain at least one Pokémon');
    }
    return this.repository.createTeam(teamName, pokemonIds);
  }

  async updateFavoriteTeam(teamId: number, teamName: string, pokemonIds: number[]): Promise<TeamEntity> {
    if (!teamId) {
      throw new Error('Team ID is required to update favorite team');
    }
    if (pokemonIds.length === 0) {
      throw new Error('Team must contain at least one Pokémon');
    }
    return this.repository.updateTeam(teamId, teamName, pokemonIds);
  }
}
