CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE team_pokemon (
  team_id INTEGER NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  pokemon_id INTEGER NOT NULL REFERENCES pokemon(id) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 6),
  PRIMARY KEY (team_id, position)
);

CREATE OR REPLACE FUNCTION check_team_size()
RETURNS TRIGGER AS $$
DECLARE
  count_pokemon INTEGER;
BEGIN
  SELECT COUNT(*) INTO count_pokemon FROM team_pokemon WHERE team_id = NEW.team_id;
  IF count_pokemon > 6 THEN
    RAISE EXCEPTION 'A team cannot have more than 6 Pokémon';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER team_size_check
  AFTER INSERT OR UPDATE ON team_pokemon
  FOR EACH ROW EXECUTE FUNCTION check_team_size();
