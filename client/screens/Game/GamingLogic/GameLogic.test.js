import { getRandomNumber, rollDice } from "./GameLogic";

const dice6 = [
  { key: "dice1", value: 1 },
  { key: "dice2", value: 2 },
  { key: "dice3", value: 3 },
  { key: "dice4", value: 4 },
  { key: "dice5", value: 5 },
  { key: "dice6", value: 6 },
];

const dice5 = [
  { key: "dice1", value: 1 },
  { key: "dice2", value: 2 },
  { key: "dice3", value: 3 },
  { key: "dice4", value: 4 },
  { key: "dice5", value: 5 },
];

const dice4 = [
  { key: "dice1", value: 1 },
  { key: "dice2", value: 2 },
  { key: "dice3", value: 3 },
  { key: "dice4", value: 4 },
];

const dice3 = [
  { key: "dice1", value: 1 },
  { key: "dice2", value: 2 },
  { key: "dice3", value: 3 },
];

const dice2 = [
  { key: "dice1", value: 1 },
  { key: "dice2", value: 2 },
];

const dice1 = [{ key: "dice1", value: 1 }];

it("should return a random number in range 1-6", () => {
  let expected1 = getRandomNumber();
  expect(expected1).toBeGreaterThanOrEqual(1);
  expect(expected1).toBeLessThan(7);
});

it("should return an array of dice of the same length as is input", () => {
  let expected1 = rollDice(dice1);
  let expected2 = rollDice(dice2);
  let expected3 = rollDice(dice3);
  let expected4 = rollDice(dice4);
  let expected5 = rollDice(dice5);
  let expected6 = rollDice(dice6);
  expect(expected6.length).toBe(6);
  expect(expected5.length).toBe(5);
  expect(expected4.length).toBe(4);
  expect(expected3.length).toBe(3);
  expect(expected2.length).toBe(2);
  expect(expected1.length).toBe(6);
});
