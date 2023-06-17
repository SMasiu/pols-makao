import { gql } from '@apollo/client';

export const GET_GAMES_QUERY = gql`
  query {
    getGames {
      id
      name
      isStarted
      players {
        id
        name
      }
    }
  }
`;

export const GET_GAME_QUERY = gql`
  query {
    getGame {
      id
      name
      isStarted
      playerTurn
      playerWon
      penalty
      penaltyType
      currentCard {
        type
        value
      }
      players {
        id
        name
        score
        connectionStatus
        blockedRounds
        cards {
          type
          value
          canCounterDrawPenalty
          canCounterBlockPenalty
        }
      }
    }
  }
`;

export const IS_IN_GAME_QUERY = gql`
  query {
    isInGame: getGame {
      id
    }
  }
`;
