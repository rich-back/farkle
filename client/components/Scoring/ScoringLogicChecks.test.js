import { checkFive, checkOne, checkMultiples, checkQuadPair } from "./ScoringLogicChecks";


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
    { key: "dice1", value: 5 },
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



it('checks for 1s', () => {
    let expected = checkOne(dice).length
    expect(expected).toBe(1)
})

it('checks for 5s', () => {
    let expected = checkFive(dice).length
    expect(expected).toBe(1)
})

it('checks for multiples', () => {
    let expected1 = checkMultiples(dice, 3)
    let expected2 = checkMultiples(diceThreeOfAKind, 3)
    let expected3 = checkMultiples(diceFourOfAKind, 4)
    let expected4 = checkMultiples(diceFiveOfAKind, 5)
    let expected5 = checkMultiples(diceSixOfAKind, 6)
    let expected6 = checkMultiples(diceTwoTriples, 3)
    expect(expected1.matched).toStrictEqual([])
    expect(expected2.matched).toStrictEqual(['5'])
    expect(expected3.matched).toStrictEqual(['6'])
    expect(expected4.matched).toStrictEqual(['6'])
    expect(expected5.matched).toStrictEqual(['6'])
    expect(expected6.matched).toStrictEqual(['2','6'])
})

it('checks for straight', () => {
    let expected = checkMultiples(dice, 1)
    expect(expected.matched).toStrictEqual(['1','2','3','4','5','6'])
})

it('checks for three doubles', () => {
    let expected = checkMultiples(diceThreeDoubles, 2)
    expect(expected.matched).toStrictEqual(['2','3','6'])
})

it('checks for Quad plus a Pair', () => {
    let expected = checkQuadPair(diceQuadPair)
    expect(expected).toBeTruthy()
})