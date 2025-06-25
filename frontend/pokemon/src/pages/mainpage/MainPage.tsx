import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import PokemonBattleCard from '../../components/PokemonBattleCard';
import PokemonCard from '../../components/PokemonCard';
import { battleService } from '../../dependencies/dependencies';


const MAX_TEAM_SIZE = 6;

interface Pokemon {
  id: number;
  name: string;
  image: string;
  health: number;
  attackPower: number;
}

export  const MainPage: React.FC = () => {
  const [roundNumber, setRoundNumber] = useState<number>(0);
  const [favoriteTeamMembers, setFavoriteTeamMembers] = useState<Pokemon[]>([]);
  const [opponentTeamMembers, setOpponentTeamMembers] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const initBattle = async () => {
      setLoading(true);
      setError(null);
      try {
        await battleService.initializeTeams(MAX_TEAM_SIZE);
        updateBattleState();
        setRoundNumber(0);
        setWinner(null);
      } catch (err: any) {
        setError(`Failed to load teams: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };
    initBattle();
  }, []);

  const updateBattleState = () => {
    const status = battleService.getBattleStatus();

    const mapToUI = (p: any): Pokemon => ({
      id: p.id,
      name: p.name,
      image: p.image,
      health: p.life,
      attackPower: p.power,
    });

    setFavoriteTeamMembers(status.favoriteTeam.map(mapToUI));
    setOpponentTeamMembers(status.opponentTeam.map(mapToUI));
    setRoundNumber(status.currentRound);
    setWinner(status.winner ?? null);
  };

  const handleBattleRound = (attackerId: number, defenderId: number) => {
    if (winner) return; 
  
    battleService.battleRound(attackerId, defenderId); 
    updateBattleState();
  };

  const handleRestart = () => {
    battleService.resetBattle();
    updateBattleState();
    setWinner(null);
    setRoundNumber(0);
  };

  const favoritePokemonSelected = favoriteTeamMembers.find(p => p.health > 0);
  const opponentPokemonSelected = opponentTeamMembers.find(p => p.health > 0);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">

      <Row className="mb-3">
        <Col className="text-center">
          <h4>Round: {roundNumber}</h4>
          {winner && <h5 className="text-success">Winner: {winner}</h5>}
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center gap-2">
        <Button variant="secondary" onClick={handleRestart}>
          Restart Battle
        </Button>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center text-primary mb-4">Your Favorite Team</h2>
          <Row className="justify-content-center">
            {favoriteTeamMembers.map(member => (
              <Col key={member.id} xs={12} sm={6} md={4} lg={2} className="mb-4 d-flex justify-content-center">
                <PokemonCard
                  id={member.id}
                  name={member.name}
                  image={member.image}
                  defeated={member.health <= 0}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="my-5 align-items-center">
        <Col xs={12} className="d-flex justify-content-around align-items-center mt-3 flex-wrap" style={{ gap: '2rem' }}>
          {favoritePokemonSelected && opponentPokemonSelected && (
            <PokemonBattleCard
              id={favoritePokemonSelected.id}
              name={favoritePokemonSelected.name}
              image={favoritePokemonSelected.image}
              health={favoritePokemonSelected.health}
              attack={favoritePokemonSelected.attackPower}
              onAttack={() => handleBattleRound(favoritePokemonSelected.id, opponentPokemonSelected.id)}

            />
          )}
          {opponentPokemonSelected && favoritePokemonSelected && (
            <PokemonBattleCard
              id={opponentPokemonSelected.id}
              name={opponentPokemonSelected.name}
              image={opponentPokemonSelected.image}
              health={opponentPokemonSelected.health}
              attack={opponentPokemonSelected.attackPower}
              onAttack={() => handleBattleRound(opponentPokemonSelected.id, favoritePokemonSelected.id)}
            />
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="text-center text-primary mb-4">Opponent Team</h2>
          <Row className="justify-content-center">
            {opponentTeamMembers.map(member => (
              <Col key={member.id} xs={12} sm={6} md={4} lg={2} className="mb-4 d-flex justify-content-center">
                <PokemonCard
                  id={member.id}
                  name={member.name}
                  image={member.image}
                  defeated={member.health <= 0}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default MainPage;
