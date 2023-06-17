import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { getRandomInt } from '../../utils/math.utils';
import { deck, shuffledDeck } from '../cards';
import { StartGameCommand, StartGameCommandResponse } from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus } from '../store';

@CommandHandler(StartGameCommand)
export class StartGameHandler implements ICommandHandler<StartGameCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute({ game }: StartGameCommand): Promise<StartGameCommandResponse> {
    if (game.isStarted) {
      throw new BadRequestException('Game is already started');
    }

    const connectedPlayers = game.players.filter(
      (player) => player.connectionStatus === ConnectionStatus.CONNECTED
    );

    if (connectedPlayers.length < 2) {
      throw new BadRequestException('Expected at least 2 players');
    }

    game.setPlayers(connectedPlayers);
    game.setPlayerWon(null);
    game.updateIsStartedFlag(true);
    game.setCardsOnTable([]);
    game.setCardsInsideDeck(shuffledDeck([...deck]));
    game.setCurrentCard(game.getFirstCardFromDeckAndRemove());
    game.setPlayerTurn(game.players[getRandomInt(0, game.players.length)].id);

    for (const player of game.players) {
      player.setCards([]);

      for (let i = 0; i < 5; i++) {
        player.addCard(game.getFirstCardFromDeckAndRemove());
      }
    }

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return game;
  }
}
