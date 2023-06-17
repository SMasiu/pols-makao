import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NextPlayerCommand, NextPlayerCommandResponse } from '../commands';
import { PenaltyType } from '../store';

@CommandHandler(NextPlayerCommand)
export class NextPlayerHandler implements ICommandHandler<NextPlayerCommand> {
  constructor(private readonly commandBus: CommandBus) {}

  async execute({
    game,
  }: NextPlayerCommand): Promise<NextPlayerCommandResponse> {
    const playerTurnIndex = game.players.findIndex(
      (player) => player.id === game.playerTurn
    );

    const nextPlayerTurn =
      playerTurnIndex === game.players.length - 1 ? 0 : playerTurnIndex + 1;

    const newCurrentPlayer = game.players[nextPlayerTurn];
    game.setPlayerTurn(newCurrentPlayer.id);

    if (newCurrentPlayer.blockedRounds) {
      newCurrentPlayer.setBlockedRounds(newCurrentPlayer.blockedRounds - 1);

      return await this.commandBus.execute<
        NextPlayerCommand,
        NextPlayerCommandResponse
      >(new NextPlayerCommand(game));
    }

    if (game.penaltyType) {
      const counterCards = newCurrentPlayer.cards.filter(
        (card) => card.getPenaltyCounters()[game.penaltyType]
      );

      if (
        counterCards.length &&
        counterCards.some((card) => card.canBePlaced(game.currentCard))
      ) {
        return game;
      }

      // Apply penalty to player
      switch (game.penaltyType) {
        case PenaltyType.DRAW: {
          for (let i = 0; i < game.penalty; i++) {
            newCurrentPlayer.addCard(game.getFirstCardFromDeckAndRemove());
          }

          break;
        }
        case PenaltyType.BLOCK: {
          newCurrentPlayer.setBlockedRounds(game.penalty);
          break;
        }
      }

      game.setPenalty(0);
      game.setPenaltyType(null);

      return await this.commandBus.execute<
        NextPlayerCommand,
        NextPlayerCommandResponse
      >(new NextPlayerCommand(game));
    }

    return game;
  }
}
