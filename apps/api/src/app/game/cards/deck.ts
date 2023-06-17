import { BasicCard } from './basic.card';
import { BlockCard } from './block.card';
import { Card, CardType, CardValue } from './card';
import { ColorCard } from './color.card';
import { DrawCard } from './draw.card';
import { QueenCard } from './queen.card';

const clubs: Card[] = [
  new DrawCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_2,
    draw: 2,
  }),
  new DrawCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_3,
    draw: 3,
  }),
  new BlockCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_4,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_5,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_6,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_7,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_8,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_9,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_10,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_JACK,
  }),
  new QueenCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_QUEEN,
  }),
  new BasicCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_KING,
  }),
  new ColorCard({
    type: CardType.CLUBS,
    value: CardValue.VAL_ACE,
  }),
];

const diamonds: Card[] = [
  new DrawCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_2,
    draw: 2,
  }),
  new DrawCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_3,
    draw: 3,
  }),
  new BlockCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_4,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_5,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_6,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_7,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_8,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_9,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_10,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_JACK,
  }),
  new QueenCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_QUEEN,
  }),
  new BasicCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_KING,
  }),
  new ColorCard({
    type: CardType.DIAMONDS,
    value: CardValue.VAL_ACE,
  }),
];

const hearts: Card[] = [
  new DrawCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_2,
    draw: 2,
  }),
  new DrawCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_3,
    draw: 3,
  }),
  new BlockCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_4,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_5,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_6,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_7,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_8,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_9,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_10,
  }),
  new BasicCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_JACK,
  }),
  new QueenCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_QUEEN,
  }),
  new DrawCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_KING,
    draw: 5,
  }),
  new ColorCard({
    type: CardType.HEARTS,
    value: CardValue.VAL_ACE,
  }),
];

const spades: Card[] = [
  new DrawCard({
    type: CardType.SPADES,
    value: CardValue.VAL_2,
    draw: 2,
  }),
  new DrawCard({
    type: CardType.SPADES,
    value: CardValue.VAL_3,
    draw: 3,
  }),
  new BlockCard({
    type: CardType.SPADES,
    value: CardValue.VAL_4,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_5,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_6,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_7,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_8,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_9,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_10,
  }),
  new BasicCard({
    type: CardType.SPADES,
    value: CardValue.VAL_JACK,
  }),
  new QueenCard({
    type: CardType.SPADES,
    value: CardValue.VAL_QUEEN,
  }),
  new DrawCard({
    type: CardType.SPADES,
    value: CardValue.VAL_KING,
    draw: 5,
  }),
  new ColorCard({
    type: CardType.SPADES,
    value: CardValue.VAL_ACE,
  }),
];

export const deck: Card[] = [...clubs, ...diamonds, ...hearts, ...spades];

export const shuffledDeck = (array: Card[]) => {
  let randomIndex: number;
  let currentIndex = array.length;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
