import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import {
  CONNECT_TO_GAME_MUTATION,
  DRAW_CARD_MUTATION,
  GAME_STATE_CHANGED_SUBSCRIPTION,
  GET_GAME_QUERY,
  PLACE_CARD_MUTATION,
  START_GAME_MUTATION,
} from '../api';
import {
  ActionsContent,
  ActionsWrapper,
  Board,
  CardView,
  GameCardsContainer,
  PlayerCards,
  PlayersContent,
  PlayersWrapper,
  PlayerTile,
  TableWrapper,
} from '../components';
import {
  Card,
  CardValue,
  ConnectionStatus,
  Game,
  PenaltyType,
  Player,
} from '../types';
import { getCookie } from '../utils';

const { Title, Paragraph } = Typography;

export const PlayGamePage = () => {
  const [startGame] = useMutation(START_GAME_MUTATION);
  const [drawCard] = useMutation(DRAW_CARD_MUTATION);
  const [placeCard] = useMutation(PLACE_CARD_MUTATION);
  const [connectToGame, { data: playerData }] = useMutation<{
    connectToGame: Player;
  }>(CONNECT_TO_GAME_MUTATION);

  const { data: gameData, subscribeToMore } = useQuery<{
    getGame: Game;
  }>(GET_GAME_QUERY);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GAME_STATE_CHANGED_SUBSCRIPTION,
      variables: { token: getCookie('token') },
      updateQuery: (_, { subscriptionData }) => {
        return { getGame: subscriptionData.data.getGame };
      },
    });
    setTimeout(() => {
      connectToGame();
    }, 250);

    return () => unsubscribe();
  }, [subscribeToMore, connectToGame]);

  const game = gameData?.getGame || null;
  const me =
    game?.players.find(
      (player) => player.id === playerData?.connectToGame.id
    ) || null;
  const winner =
    game?.players.find((player) => player.id === game.playerWon) || null;

  if (!game || !me) return <p>Loading</p>;

  const canCardBePlaced = (card: Card) => {
    if (
      !game.players.every(
        (player) => player.connectionStatus === ConnectionStatus.CONNECTED
      )
    ) {
      return false;
    }

    if (!game.isStarted || !game.currentCard || game.playerTurn !== me.id)
      return false;

    if (game.penaltyType) {
      if (
        game.penaltyType === PenaltyType.BLOCK &&
        !card.canCounterBlockPenalty
      )
        return false;
      if (game.penaltyType === PenaltyType.DRAW && !card.canCounterDrawPenalty)
        return false;
    }

    if (
      game.currentCard.value === CardValue.VAL_QUEEN ||
      card.value === CardValue.VAL_QUEEN
    )
      return true;

    return (
      game.currentCard.value === card.value ||
      game.currentCard.type === card.type
    );
  };

  return (
    <Board>
      <PlayersWrapper>
        <Title level={2}>Players</Title>
        <PlayersContent>
          {game.players.map((player) => (
            <PlayerTile key={player.id} $active={game.playerTurn === player.id}>
              <Title level={5}>
                {player.name} {player.id === me.id && '(You)'}
              </Title>
              <Paragraph>
                Status: {player.connectionStatus.toLowerCase()}
              </Paragraph>
              <Paragraph>Cards: {player.cards.length}</Paragraph>
              <Paragraph>Score: {player.score}</Paragraph>
              {!!player.blockedRounds && (
                <Paragraph>Blocked: {player.blockedRounds}</Paragraph>
              )}
            </PlayerTile>
          ))}
        </PlayersContent>
      </PlayersWrapper>
      <TableWrapper>
        <Title level={2}>Board</Title>
        {game.currentCard ? (
          <Fragment>
            {game.penaltyType && (
              <Paragraph>
                +{game.penalty}{' '}
                {game.penaltyType === PenaltyType.BLOCK
                  ? 'blocked rounds'
                  : 'cards'}
              </Paragraph>
            )}
            <CardView card={game.currentCard} />
          </Fragment>
        ) : (
          <Paragraph>Game not started</Paragraph>
        )}
      </TableWrapper>
      <ActionsWrapper>
        {!game.isStarted ? (
          game.players.filter(
            (p) => p.connectionStatus === ConnectionStatus.CONNECTED
          ).length < 2 ? (
            <Paragraph>Waiting for players</Paragraph>
          ) : (
            <ActionsContent>
              {winner && <Paragraph>Player {winner.name} won!</Paragraph>}
              <Button onClick={() => startGame()}>
                Start {winner && 'again'}
              </Button>
            </ActionsContent>
          )
        ) : (
          <PlayerCards>
            <Title level={2}>Your cards</Title>
            <GameCardsContainer>
              {me.cards.map((card, index) => (
                <CardView
                  size="sm"
                  card={card}
                  key={index}
                  disabled={!canCardBePlaced(card)}
                  onClick={() =>
                    placeCard({
                      variables: {
                        card: {
                          type: card.type,
                          value: card.value,
                        },
                      },
                    })
                  }
                />
              ))}
            </GameCardsContainer>
            {game.playerTurn === me.id ? (
              <Button onClick={() => drawCard()}>Draw</Button>
            ) : (
              <Paragraph>Wait for your turn</Paragraph>
            )}
          </PlayerCards>
        )}
      </ActionsWrapper>
    </Board>
  );
};
