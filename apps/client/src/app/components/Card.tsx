import styled, { css } from 'styled-components';
import { Card } from '../types';

export interface CardViewProps {
  card: Card;
  size?: 'md' | 'sm';
  onClick?: () => void;
  disabled?: boolean;
}

export const Img = styled.img<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      filter: brightness(0.5);
      pointer-events: none;
    `}
`;

export const CardView = ({ card, size, onClick, disabled }: CardViewProps) => {
  return (
    <Img
      onClick={onClick}
      $disabled={!!disabled}
      src={`/assets/cards/${card.value
        .toLowerCase()
        .substring(4)}_of_${card.type.toLowerCase()}.svg`}
      alt="card"
      style={{ maxWidth: size === 'sm' ? '75px' : '200px' }}
    />
  );
};
