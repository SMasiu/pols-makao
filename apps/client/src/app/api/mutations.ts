import { gql } from '@apollo/client';

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($game: CreateGameModel!, $player: CreatePlayerModel!) {
    createGame(game: $game, player: $player) {
      id
    }
  }
`;

export const JOIN_TO_GAME_MUTATION = gql`
  mutation JoinToGame($gameId: String!, $player: CreatePlayerModel!) {
    joinToGame(gameId: $gameId, player: $player) {
      id
    }
  }
`;

export const CONNECT_TO_GAME_MUTATION = gql`
  mutation ConnectToGame {
    connectToGame {
      id
    }
  }
`;

export const START_GAME_MUTATION = gql`
  mutation {
    startGame {
      id
    }
  }
`;

export const DRAW_CARD_MUTATION = gql`
  mutation {
    drawCard {
      id
    }
  }
`;

export const PLACE_CARD_MUTATION = gql`
  mutation PlaceCard($card: PlaceCardModel!) {
    placeCard(card: $card) {
      id
    }
  }
`;
