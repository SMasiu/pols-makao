export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomFromArray = <T>(array: T[]) => {
  return array[getRandomInt(0, array.length)];
};
