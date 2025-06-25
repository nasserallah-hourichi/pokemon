import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { PokemonSelectionGrid } from '../../components/PokemonSelectionGrid/PokemonSelectionGrid';
import { pokemonService, teamService } from '../../dependencies/dependencies';
import { usePokemonList } from '../../components/PokemonList/usePokemonList';

const MAX_POKEMONS_PER_TEAM = 6;

const getBackgroundColorByType = (type: number): React.CSSProperties => {
  switch (type) {
    case 1:
      return { backgroundColor: 'red' };
    case 2:
      return { backgroundColor: 'blue' };
    case 3:
      return { backgroundColor: 'green' };
    default:
      return { backgroundColor: 'gray' };
  }
};

const HomePage: React.FC = () => {
  const { pokemon: allPokemons, loading: loadingAllPokemons, error: errorAllPokemons } = usePokemonList();

  const [favoriteTeamId, setFavoriteTeamId] = useState<number | null>(null);
  const [favoriteTeamName, setFavoriteTeamName] = useState<string>('');
  const [selectedFavoritePokemonIds, setSelectedFavoritePokemonIds] = useState<number[]>([]);
  const [loadingFavoriteTeam, setLoadingFavoriteTeam] = useState<boolean>(false);
  const [favoriteTeamError, setFavoriteTeamError] = useState<string | null>(null);
  const [favoriteTeamSuccess, setFavoriteTeamSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteTeam = async () => {
      try {
        setLoadingFavoriteTeam(true);
        const team = await teamService.getFavoriteTeam();
        setFavoriteTeamId(team.id);
        setFavoriteTeamName(team.name);
        setSelectedFavoritePokemonIds(team.pokemonIds || []);
      } catch (err: any) {
        setFavoriteTeamError(`Error fetching favorite team: ${err.message}`);
      } finally {
        setLoadingFavoriteTeam(false);
      }
    };
    fetchFavoriteTeam();
  }, []);

  const handleFavoritePokemonSelect = (pokemonId: number) => {
    setSelectedFavoritePokemonIds((prevSelected) => {
      if (prevSelected.includes(pokemonId)) {
        return prevSelected.filter((id) => id !== pokemonId);
      } else if (prevSelected.length < MAX_POKEMONS_PER_TEAM) {
        return [...prevSelected, pokemonId];
      } else {
        setFavoriteTeamError(`You can only select up to ${MAX_POKEMONS_PER_TEAM} Pokemons.`);
        return prevSelected;
      }
    });
    setFavoriteTeamError(null);
  };

  const handleSaveFavoriteTeam = async () => {
    if (!favoriteTeamName.trim()) {
      setFavoriteTeamError('Team name cannot be empty.');
      return;
    }
    if (selectedFavoritePokemonIds.length !== MAX_POKEMONS_PER_TEAM) {
      setFavoriteTeamError(`Please select exactly ${MAX_POKEMONS_PER_TEAM} Pokemons.`);
      return;
    }

    setLoadingFavoriteTeam(true);
    setFavoriteTeamError(null);
    setFavoriteTeamSuccess(null);

    try {
      const updatedTeam = await teamService.updateFavoriteTeam(
        favoriteTeamId!,
        favoriteTeamName.trim(),
        selectedFavoritePokemonIds
      );
      setFavoriteTeamSuccess(`Favorite team updated successfully.`);
      setFavoriteTeamId(updatedTeam.id);
    } catch (err: any) {
      setFavoriteTeamError(`Error updating favorite team: ${err.message}`);
    } finally {
      setLoadingFavoriteTeam(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h2 className="text-center text-primary mb-4">Your Favorite Team</h2>
          {loadingFavoriteTeam && <Spinner animation="border" role="status" />}
          {favoriteTeamError && <Alert variant="danger">{favoriteTeamError}</Alert>}
          {favoriteTeamSuccess && <Alert variant="success">{favoriteTeamSuccess}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your favorite team name"
                value={favoriteTeamName}
                onChange={(e) => setFavoriteTeamName(e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">
                Select {MAX_POKEMONS_PER_TEAM} Pokemons (Selected: {selectedFavoritePokemonIds.length}/{MAX_POKEMONS_PER_TEAM})
              </Form.Label>
              <PokemonSelectionGrid
                pokemons={allPokemons}
                selectedIds={selectedFavoritePokemonIds}
                onSelect={handleFavoritePokemonSelect}
                loading={loadingAllPokemons}
                error={errorAllPokemons}
                maxSelections={MAX_POKEMONS_PER_TEAM}
                getBackgroundColorByType={getBackgroundColorByType}
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={handleSaveFavoriteTeam}
              disabled={loadingFavoriteTeam || selectedFavoritePokemonIds.length !== MAX_POKEMONS_PER_TEAM || !favoriteTeamName.trim()}
              className="w-100 mt-3"
            >
              {loadingFavoriteTeam ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> : null}
              Save Favorite Team
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;


