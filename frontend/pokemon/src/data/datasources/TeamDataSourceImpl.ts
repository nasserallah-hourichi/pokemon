
  import { supabase } from '../../config/supabase';
import { TeamDto } from '../models/team';
  
  export interface ITeamDataSource {
    getFavoriteTeam(): Promise<TeamDto>;
    createTeam(name: string, pokemonIds: number[]): Promise<TeamDto>;
    updateTeam(id: number, name: string, pokemonIds: number[]): Promise<TeamDto>;
  }
  export class TeamDataSourceImpl implements ITeamDataSource {
    async getFavoriteTeam(): Promise<TeamDto> {
      const { data, error } = await supabase
        .from('team')
        .select('id, name, team_pokemon(pokemon_id)')
        .limit(1)
        .single();
  
      if (error) throw new Error(error.message);
  
      return {
        id: data.id,
        name: data.name,
        pokemonIds: data.team_pokemon.map((tp: any) => tp.pokemon_id),
      };
    }
  
    async createTeam(name: string, pokemonIds: number[]): Promise<TeamDto> {
      const { data, error } = await supabase.rpc('insert_team', {
        team_name: name,
        pokemon_ids: pokemonIds,
      });
  
      if (error) throw new Error(error.message);
  
      return data as TeamDto;
    }
  
    async updateTeam(id: number, name: string, pokemonIds: number[]): Promise<TeamDto> {
      const { error: updateError } = await supabase.from('team').update({ name }).eq('id', id);
      if (updateError) throw new Error(updateError.message);
  
      const { error: deleteError } = await supabase.from('team_pokemon').delete().eq('team_id', id);
      if (deleteError) throw new Error(deleteError.message);
  
      const newLinks = pokemonIds.map((pid, index) => ({
        team_id: id,
        pokemon_id: pid,
        position: index + 1,
      }));
  
      const { error: insertError } = await supabase.from('team_pokemon').insert(newLinks);
      if (insertError) throw new Error(insertError.message);
  
      return { id, name, pokemonIds };
    }
  }
  