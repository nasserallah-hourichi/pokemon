CREATE OR REPLACE FUNCTION get_teams_ordered_by_power()
RETURNS TABLE (
  team_id INTEGER,
  team_name TEXT,
  team_power INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT t.id, t.name, SUM(p.power) AS team_power
  FROM team t
  JOIN team_pokemon tp ON tp.team_id = t.id
  JOIN pokemon p ON p.id = tp.pokemon_id
  GROUP BY t.id, t.name
  ORDER BY team_power DESC;
END;
$$ LANGUAGE plpgsql;
