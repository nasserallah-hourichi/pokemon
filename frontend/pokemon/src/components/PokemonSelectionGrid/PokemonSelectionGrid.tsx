import React from 'react';
import { Card, Alert, Spinner, Col, Row } from 'react-bootstrap';
import { PokemonEntity } from '../../domain/entities/PokemonEntity';
import { PokemonModel } from '../../data/models/pokemon';

interface PokemonSelectionGridProps {
    pokemons: PokemonModel[];
    selectedIds: number[];
    onSelect: (id: number) => void;
    loading: boolean;
    error: string | null;
    maxSelections: number;
    getBackgroundColorByType?: (type: number) => React.CSSProperties;
  }
  

// Define the type-to-color map directly within this component's scope
const TYPE_COLORS: { [key: number]: string } = {
  1: '#DC3545', // Fire -> Red (using Bootstrap Danger color for consistency)
  2: '#0D6EFD', // Water -> Blue (using Bootstrap Primary color)
  3: '#198754', // Grass -> Green (using Bootstrap Success color)
};

const getBackgroundColor = (type: number): string => {
  return TYPE_COLORS[type] || '#6C757D'; // Default to grey if type not explicitly mapped
};

const getTextColor = (type: number): string => {
  // For the specified red, blue, green, white text provides good contrast.
  // For other/default types, dark text might be better on a lighter background.
  if ([1, 2, 3].includes(type)) {
    return '#FFFFFF'; // White text for Fire, Water, Grass
  }
  return '#212529'; // Dark text for others
};
export const PokemonSelectionGrid: React.FC<PokemonSelectionGridProps> = ({
    pokemons,
    selectedIds,
    onSelect,
    loading,
    error,
    getBackgroundColorByType,
  }) => {
    if (loading) return <Spinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;
  
    return (
      <Row>
        {pokemons.map((p) => {
          const isSelected = selectedIds.includes(p.id);
          const bgStyle = getBackgroundColorByType?.(p.type) ?? {};
          return (
            <Col key={p.id} xs={6} sm={4} md={2} className="mb-3">
              <div
                onClick={() => onSelect(p.id)}
                style={{
                  ...bgStyle,
                  border: isSelected ? '3px solid black' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                }}
              >
                <img src={p.image} alt={p.name} className="img-fluid" />
                <p className="text-center text-white">{p.name}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };