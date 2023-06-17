import { gql } from '@apollo/client';

export const GAME_STATE_CHANGED_SUBSCRIPTION = gql`
  subscription GameStateChanged($token: String!) {
    getGame: gameStateChanged(token: $token) {
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

export const GAMES_CHANGED_SUBSCRIPTION = gql`
  subscription {
    getGames: onGamesChanges {
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
