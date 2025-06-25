
import { PokemonRepositoryImpl } from '../data/repositories/pokemonRepository';
import { PokemonDataSourceImpl } from '../data/datasources/PokemonDataSourceImpl';
import { PokemonService } from '../services/pokemon_service';
import { TeamService } from '../services/team_service';
import { BattleService } from '../services/battle_service';
import { TeamDataSourceImpl } from '../data/datasources/TeamDataSourceImpl';
import { TeamRepositoryImpl } from '../data/repositories/teamRepostiory';

const pokemonDataSource = new PokemonDataSourceImpl();

const teamDataSource = new TeamDataSourceImpl();

const pokemonRepository = new PokemonRepositoryImpl(pokemonDataSource);

const teamRepostiory = new TeamRepositoryImpl(teamDataSource);

export const pokemonService = new PokemonService(pokemonRepository);

export const battleService = new BattleService();

export const teamService = new TeamService(teamRepostiory);


export {};