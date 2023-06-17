import styled from 'styled-components';

export const Board = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  min-height: 100vh;
  row-gap: 24px;
  padding: 24px;
`;

export const PlayersWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlayersContent = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ActionsWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionsContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const PlayerCards = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    text-align: center;
  }
`;

export const GameCardsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  img {
    margin: 12px;
  }
`;
