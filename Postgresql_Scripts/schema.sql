-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.pokemon (
  id integer NOT NULL DEFAULT nextval('pokemon_id_seq'::regclass),
  name text NOT NULL,
  type integer NOT NULL,
  image text,
  power integer NOT NULL CHECK (power >= 10 AND power <= 100),
  life integer NOT NULL CHECK (life >= 10 AND life <= 100),
  CONSTRAINT pokemon_pkey PRIMARY KEY (id),
  CONSTRAINT pokemon_type_fkey FOREIGN KEY (type) REFERENCES public.pokemon_type(id)
);
CREATE TABLE public.pokemon_type (
  id integer NOT NULL DEFAULT nextval('pokemon_type_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  CONSTRAINT pokemon_type_pkey PRIMARY KEY (id)
);
CREATE TABLE public.team (
  id integer NOT NULL DEFAULT nextval('team_id_seq'::regclass),
  name text NOT NULL,
  CONSTRAINT team_pkey PRIMARY KEY (id)
);
CREATE TABLE public.team_pokemon (
  team_id integer NOT NULL,
  pokemon_id integer NOT NULL,
  position integer NOT NULL CHECK ("position" >= 1 AND "position" <= 6),
  CONSTRAINT team_pokemon_pkey PRIMARY KEY (team_id, position),
  CONSTRAINT team_pokemon_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id),
  CONSTRAINT team_pokemon_pokemon_id_fkey FOREIGN KEY (pokemon_id) REFERENCES public.pokemon(id)
);
CREATE TABLE public.weakness (
  id integer NOT NULL DEFAULT nextval('weakness_id_seq'::regclass),
  type1 integer NOT NULL,
  type2 integer NOT NULL,
  factor double precision NOT NULL,
  CONSTRAINT weakness_pkey PRIMARY KEY (id),
  CONSTRAINT weakness_type1_fkey FOREIGN KEY (type1) REFERENCES public.pokemon_type(id),
  CONSTRAINT weakness_type2_fkey FOREIGN KEY (type2) REFERENCES public.pokemon_type(id)
);