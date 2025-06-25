import React from 'react';

interface PokemonBattleCardProps {
  id: number;
  name: string;
  image: string;
  health: number;   // 0-100
  attack: number;
  onAttack?: () => void;
}

const PokemonBattleCard: React.FC<PokemonBattleCardProps> = ({ id, name, image, health, attack, onAttack }) => {
  const validHealth = Math.min(Math.max(health, 0), 100);

  return (
    <div style={{
      width: 220,
      border: '2px solid #444',
      borderRadius: 12,
      padding: 16,
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      userSelect: 'none',
    }}>
      {/* Health Bar */}
      <div style={{
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ddd',
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
        userSelect: 'none',
      }}>
        <div
          style={{
            height: '100%',
            width: `${validHealth}%`,
            backgroundColor: validHealth > 30 ? '#4caf50' : '#f44336',
            transition: 'width 0.3s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 12,
            whiteSpace: 'nowrap',
            padding: '0 6px',
            boxSizing: 'border-box',
          }}
        >
          {validHealth}
        </div>

        {/* Show health number outside if bar too small */}
        {validHealth < 15 && (
          <span style={{
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#f44336',
            fontWeight: 'bold',
            fontSize: 12,
            userSelect: 'none',
          }}>
            {validHealth}
          </span>
        )}
      </div>

      {/* Circle container (relative) */}
      <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
        {/* Circle with Image */}
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #2196f3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e3f2fd',
        }}>
          <img
            src={image}
            alt={name}
            style={{ width: '90%', height: '90%', objectFit: 'contain' }}
          />
        </div>

        {/* Sword button - bottom right overlap */}
        <button
          onClick={onAttack}
          aria-label={`Attack with ${name}`}
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            cursor: 'pointer',
            backgroundColor: '#fff',
            border: '2px solid #f44336',
            borderRadius: '50%',
            padding: 8,
            fontSize: 24,
            color: '#f44336',
            userSelect: 'none',
            boxShadow: '0 0 5px rgba(244,67,54,0.6)',
            transition: 'transform 0.1s ease',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ⚔️
        </button>
      </div>

      {/* Name, ID, Attack below */}
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <h3 style={{ margin: 4 }}>{name} #{id}</h3>
        <p style={{ margin: 2, color: '#555' }}><strong>Attack:</strong> {attack}</p>
      </div>
    </div>
  );
};

export default PokemonBattleCard;
