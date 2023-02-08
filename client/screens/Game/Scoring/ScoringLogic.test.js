import { countScore, endTurn } from './ScoringLogic'

const dice = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ];

const diceThreeOfAKind = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 5 },
    { key: "dice4", value: 5 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ];

  const diceFourOfAKind = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 6 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ];
  const diceFiveOfAKind = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 6 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 6 },
  ];
  const diceSixOfAKind = [
    { key: "dice1", value: 6 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 6 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 6 },
  ];
  const diceTwoTriples = [
    { key: "dice1", value: 6 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 2 },
    { key: "dice5", value: 2 },
    { key: "dice6", value: 2 },
  ];
  const diceThreeDoubles = [
    { key: "dice1", value: 6 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 2 },
    { key: "dice4", value: 2 },
    { key: "dice5", value: 3 },
    { key: "dice6", value: 3 },
  ];
  const diceQuadPair = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 1 },
    { key: "dice3", value: 1 },
    { key: "dice4", value: 1 },
    { key: "dice5", value: 2 },
    { key: "dice6", value: 2 },
  ];

  it('scores six of a kind', () => {
    let expected = countScore({roundScore:0,rollScore:0, keptDice: diceSixOfAKind})
    let expectedFail = countScore({roundScore:0,rollScore:0, keptDice: dice})
    expect(expected.roundScore).toBe(3000)
    expect(expectedFail.roundScore).toBe(0)
  })