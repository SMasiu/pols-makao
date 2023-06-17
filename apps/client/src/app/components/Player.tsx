import styled, { css } from 'styled-components';

export interface PlayerTileProps {
  $active: boolean;
}

export const PlayerTile = styled.section<PlayerTileProps>`
  background-color: #eeeeee;
  border: 1px solid #b2b2b2;
  padding: 12px 24px;
  border-radius: 16px;
  margin: 12px 24px;

  .ant-typography {
    margin-bottom: 4px;
  }

  ${({ $active }) =>
    $active &&
    css`
      border: 2px solid #6d6de3;
    `}}
`;
