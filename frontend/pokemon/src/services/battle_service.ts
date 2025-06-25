import { PokemonModel } from '../data/models/pokemon';
import { pokemonService, teamService } from '../dependencies/dependencies';

const typeEffectiveness: Record<string, Record<string, number>> = {
  Fire: { Fire: 1, Water: 0.5 },
  Water: { Fire: 2, Water: 1 },
};

export class BattleService {
  private originalFavoriteTeam: PokemonModel[] = [];
  private originalOpponentTeam: PokemonModel[] = [];

  private currentFavoriteTeam: PokemonModel[] = [];
  private currentOpponentTeam: PokemonModel[] = [];

  private favIndex = 0;
  private oppIndex = 0;

  public currentRound = 1;
  private maxRounds = 100;

  private winner: 'favorite' | 'opponent' | null = null;

  async initializeTeams(maxTeamSize: number = 6) {
    const allPokemons = await pokemonService.getPokemons();
    const favTeam = await teamService.getFavoriteTeam();

    this.originalFavoriteTeam = favTeam.pokemonIds
      .map((id: number) => allPokemons.find((p: any) => p.id === id))
      .filter(Boolean)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        life: p.life,
        power: p.power,
        type: p.type?.name || "Unknown",
      }));

    const remainingPokemons = allPokemons.filter((p: any) => !favTeam.pokemonIds.includes(p.id));
    const shuffled = remainingPokemons.sort(() => 0.5 - Math.random());
    this.originalOpponentTeam = shuffled.slice(0, maxTeamSize).map((p: any) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      life: p.life,
      power: p.power,
      type: p.type?.name || "Unknown",
    }));

    this.resetBattle();
  }


  resetBattle() {
    this.currentFavoriteTeam = this.originalFavoriteTeam.map(p => ({ ...p }));
    this.currentOpponentTeam = this.originalOpponentTeam.map(p => ({ ...p }));
    this.favIndex = 0;
    this.oppIndex = 0;
    this.currentRound = 0;
    this.winner = null;
  }

  private calculateDamage(attacker: PokemonModel, defender: PokemonModel): number {
    const factor = typeEffectiveness[attacker.type]?.[defender.type] ?? 1;
    const damage = attacker.power * factor;
    console.log("damage ",damage)
    return attacker.power * factor;
  }

  battleRound(attackerId: number, defenderId: number) {
    const favoriteTeam = this.currentFavoriteTeam;
    const opponentTeam = this.currentOpponentTeam;
  
    const attacker =
      favoriteTeam.find(p => p.id === attackerId) ||
      opponentTeam.find(p => p.id === attackerId);
  
    const defender =
      favoriteTeam.find(p => p.id === defenderId) ||
      opponentTeam.find(p => p.id === defenderId);
  
    if (!attacker || !defender || attacker.life <= 0 || defender.life <= 0) {
      return;
    }
  
    const damage = this.calculateDamage(attacker, defender);
    defender.life = Math.max(defender.life - damage, 0);
  
  
    this.currentRound++;
    this.determineWinner();
  }
  

  private determineWinner() {
    if (this.favIndex >= this.currentFavoriteTeam.length && this.oppIndex >= this.currentOpponentTeam.length) {
      this.winner = null;
    } else if (this.favIndex >= this.currentFavoriteTeam.length) {
      this.winner = 'opponent';
    } else if (this.oppIndex >= this.currentOpponentTeam.length) {
      this.winner = 'favorite';
    }
  }

  getBattleStatus() {
    return {
      currentRound: this.currentRound,
      maxRounds: this.maxRounds,
      favoriteTeam: this.currentFavoriteTeam.map(p => ({ ...p })),
      opponentTeam: this.currentOpponentTeam.map(p => ({ ...p })),
      favoriteIndex: this.favIndex,
      opponentIndex: this.oppIndex,
      winner: this.winner,
    };
  }
}
