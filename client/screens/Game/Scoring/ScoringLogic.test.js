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
    { key: "dice2", value: 1 },
    { key: "dice3", value: 1 },
    { key: "dice4", value: 3 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ];
const diceThreeOfAKind2 = [
    { key: "dice1", value: 4 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 2 },
    { key: "dice4", value: 2 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 6 },
  ];
const diceThreeOfAKind3 = [
    { key: "dice1", value: 4 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 3 },
    { key: "dice5", value: 3 },
    { key: "dice6", value: 6 },
  ];
const diceThreeOfAKind4 = [
    { key: "dice1", value: 6 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 4 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 4 },
    { key: "dice6", value: 6 },
  ];
const diceThreeOfAKind5 = [
    { key: "dice1", value: 3 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 5 },
    { key: "dice4", value: 5 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ];
const diceThreeOfAKind6 = [
    { key: "dice1", value: 3 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 4 },
    { key: "dice4", value: 6 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 6 },
  ];

  const diceFourOfAKind = [
    { key: "dice1", value: 5 },
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 6 },
    { key: "dice5", value: 4 },
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
  const diceSingleOne = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 6 },
  ];
  const diceSingleFive = [
    { key: "dice1", value: 5 },
    { key: "dice2", value: 4 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 2 },
    { key: "dice6", value: 2 },
  ];
  const diceTwoOnes = [
    { key: "dice1", value: 1 },
    { key: "dice2", value: 3 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 1 },
    { key: "dice5", value: 4 },
    { key: "dice6", value: 2 },
  ];
  const diceTwoFives = [
    { key: "dice1", value: 5 },
    { key: "dice2", value: 3 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 5 },
    { key: "dice5", value: 6 },
    { key: "dice6", value: 2 },
  ];
  const diceTwoOnesTwoFives = [
    { key: "dice1", value: 5 },
    { key: "dice2", value: 1 },
    { key: "dice3", value: 1 },
    { key: "dice4", value: 5 },
    { key: "dice5", value: 4 },
    { key: "dice6", value: 2 },
  ];
  const diceSingleOneSingleFive = [
    { key: "dice1", value: 5 },
    { key: "dice2", value: 1 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 4 },
    { key: "dice6", value: 2 },
  ];

  const fourDiceFourOfAKind = [
    { key: "dice2", value: 6 },
    { key: "dice3", value: 6 },
    { key: "dice4", value: 6 },
    { key: "dice6", value: 6 },
  ];

  it('scores six of a kind', () => {
    let expected = countScore({roundScore:0,rollScore:0, keptDice: diceSixOfAKind})
    expect(expected.roundScore).toBe(3000)
  })

  it('scores all variants of 1500pts', () => {
    let expected1 = countScore({roundScore:0,rollScore:0, keptDice: diceQuadPair})
    let expected2 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeDoubles})
    let expected3 = countScore({roundScore:0,rollScore:0, keptDice: dice})
    expect(expected1.roundScore).toBe(1500)
    expect(expected2.roundScore).toBe(1500)
    expect(expected3.roundScore).toBe(1500)
  })

  it('scores two triples', () => {
    let expected = countScore({roundScore:0,rollScore:0, keptDice: diceTwoTriples})
    expect(expected.roundScore).toBe(2500)
  })

  it('scores five of a kind', () => {
    let expected = countScore({roundScore:0,rollScore:0, keptDice: diceFiveOfAKind})
    expect(expected.roundScore).toBe(2050)
  })

  it('scores four of a kind', () => {
    let expected = countScore({roundScore:0,rollScore:0, keptDice: diceFourOfAKind})
    expect(expected.roundScore).toBe(1050)
  })

  it('scores all variants of three of a kind', () => {
    let expected1 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind})
    let expected2 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind2})
    let expected3 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind3})
    let expected4 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind4})
    let expected5 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind5})
    let expected6 = countScore({roundScore:0,rollScore:0, keptDice: diceThreeOfAKind6})
    expect(expected1.roundScore).toBe(150)
    expect(expected2.roundScore).toBe(200)
    expect(expected3.roundScore).toBe(300)
    expect(expected4.roundScore).toBe(400)
    expect(expected5.roundScore).toBe(500)
    expect(expected6.roundScore).toBe(600)
  })

  it('scores single ones and/or fives', ()=>{
    let expected1 = countScore({roundScore:0,rollScore:0, keptDice: diceSingleOne})
    let expected2 = countScore({roundScore:0,rollScore:0, keptDice: diceSingleFive})
    let expected3 = countScore({roundScore:0,rollScore:0, keptDice: diceTwoOnes})
    let expected4 = countScore({roundScore:0,rollScore:0, keptDice: diceTwoFives})
    let expected5 = countScore({roundScore:0,rollScore:0, keptDice: diceTwoOnesTwoFives})  
    let expected6 = countScore({roundScore:0,rollScore:0, keptDice: diceSingleOneSingleFive})
    expect(expected1.roundScore).toBe(100)
    expect(expected2.roundScore).toBe(50)
    expect(expected3.roundScore).toBe(200)
    expect(expected4.roundScore).toBe(100)
    expect(expected5.roundScore).toBe(300)
    expect(expected6.roundScore).toBe(150)
})

it('scores with less than six dice provided', () => {
  let expected = countScore({roundScore:0,rollScore:0, keptDice: fourDiceFourOfAKind})
  expect(expected.roundScore).toBe(1000)
})

const singleOne = [
  { key: "dice2", value: 1 }
];
it('scores with just a single dice', () => {
  let expected = countScore({roundScore:0,rollScore:0, keptDice: singleOne})
  expect(expected.roundScore).toBe(100)
})

const sixDiceFarkle = [
  { key: "dice1", value: 2 },
  { key: "dice2", value: 2 },
  { key: "dice3", value: 3 },
  { key: "dice4", value: 4 },
  { key: "dice5", value: 4 },
  { key: "dice6", value: 6 },
];
it('scores 0 for a Farkle', () => {
  let expected = countScore({roundScore:0,rollScore:0, keptDice: sixDiceFarkle})
  expect(expected.roundScore).toBe(0)
})

