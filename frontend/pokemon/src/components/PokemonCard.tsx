import React from 'react';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  defeated?: boolean; // new optional prop
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, defeated = false }) => {
  return (
    <div
      style={{
        width: 150,
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'default',
        opacity: defeated ? 0.5 : 1,
        filter: defeated ? 'grayscale(70%)' : 'none',
        transition: 'opacity 0.3s ease',
        backgroundColor: '#fff',
        boxShadow: defeated ? 'none' : '0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          margin: '0 auto 8px',
          borderRadius: '50%',
          border: '3px solid #2196f3',
          backgroundColor: '#e3f2fd',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={image} alt={name} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <h4 style={{ margin: 0 }}>{name}</h4>
      <small style={{ color: '#2196f3' }}>#{id}</small>
    </div>
  );
};

export default PokemonCard;
