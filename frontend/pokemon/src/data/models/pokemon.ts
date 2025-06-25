export interface PokemonEntity {
  id: number;
  name: string;
  type: number; // foreign key id
  image?: string;
  power: number;
  life: number;
}

// models/PokemonModel.ts
export interface PokemonModel {
  id: number;
  name: string;
  image?: string;
  life: number;
  power: number;
  type: number;
}