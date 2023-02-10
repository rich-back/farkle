import { dicePress, getRandomNumber, rollDice } from "./GameLogic";

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
  let expected1 = rollDice({ liveDice: dice1 });
  let expected2 = rollDice({ liveDice: dice2 });
  let expected3 = rollDice({ liveDice: dice3 });
  let expected4 = rollDice({ liveDice: dice4 });
  let expected5 = rollDice({ liveDice: dice5 });
  let expected6 = rollDice({ liveDice: dice6 });
  expect(expected6.newDice.length).toBe(6);
  expect(expected5.newDice.length).toBe(5);
  expect(expected4.newDice.length).toBe(4);
  expect(expected3.newDice.length).toBe(3);
  expect(expected2.newDice.length).toBe(2);
  expect(expected1.newDice.length).toBe(1);
});

it("should return 2 altered arrays of dice(one decrement, one increment)", () => {
  expected1 = dicePress({ itemKey: "dice1", liveDice: dice6 });
  expect(expected1.tempLiveDice.length).toBe(5);
  expect(expected1.tempKeptDice.length).toBe(0);
});
