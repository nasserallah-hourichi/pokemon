export interface PokemonEntity {
  id: number;
  name: string;
  type: number;
  image?: string;
  power: number;
  life: number;
}

export interface PokemonModel {
  id: number;
  name: string;
  image?: string;
  life: number;
  power: number;
  type: number;
}