CREATE OR REPLACE FUNCTION insert_team(
  team_name TEXT,
  pokemon_ids INTEGER[]
) RETURNS INTEGER AS $$
DECLARE
  new_team_id INTEGER;
BEGIN
  IF array_length(pokemon_ids, 1) IS DISTINCT FROM 6 THEN
    RAISE EXCEPTION 'You must provide exactly 6 Pokémon IDs';
  END IF;

  INSERT INTO team (name) VALUES (team_name) RETURNING id INTO new_team_id;

  INSERT INTO team_pokemon (team_id, pokemon_id, position)
  SELECT new_team_id, pid, pos
  FROM unnest(pokemon_ids) WITH ORDINALITY AS t(pid, pos);

  RETURN new_team_id;
END;
$$ LANGUAGE plpgsql;
