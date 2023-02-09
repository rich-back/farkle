import {
  checkFive,
  checkOne,
  checkMultiples,
  checkQuadPair,
} from "./ScoringLogicChecks";

const countScore = ({ roundScore, rollScore, keptDice }) => {
  let tempRoundScore = roundScore;
  let tempRollScore = rollScore;
  if (checkMultiples(keptDice, 6).matched.length === 1) {
    tempRollScore += 3000;
  } else if (checkMultiples(keptDice, 3).matched.length === 2) {
    tempRollScore += 2500;
  } else if (checkMultiples(keptDice, 5).matched.length === 1) {
    if (checkRemainingIsOne(keptDice, 5)) {
      tempRollScore += 2100;
    } else if (checkRemainingIsFive(keptDice, 5)) {
      tempRollScore += 2050;
    } else {
      tempRollScore += 2000;
    }
  } else if (
    checkQuadPair(keptDice) === true ||
    checkMultiples(keptDice, 2).matched.length === 3 ||
    checkMultiples(keptDice, 1).matched.length === 6
  ) {
    tempRollScore += 1500;
  } else if (checkMultiples(keptDice, 4).matched.length === 1)
    if (checkRemainingIsOne(keptDice, 4) && checkRemainingIsFive(keptDice, 4)) {
      tempRollScore += 1150;
    } else if (
      checkRemainingIsOne(keptDice, 4) &&
      !checkRemainingIsFive(keptDice, 4)
    ) {
      tempRollScore += 1100;
    } else if (
      !checkRemainingIsOne(keptDice, 4) &&
      checkRemainingIsFive(keptDice, 4)
    ) {
      tempRollScore += 1050;
    } else {
      tempRollScore += 1000;
    }
  else if (checkMultiples(keptDice, 3).matched.length === 1) {
    tempRollScore += checkMultiples(keptDice, 3).matched * 100;
  } else {
    tempRollScore += onesFivesOutcome(keptDice);
  }

  return { roundScore: tempRoundScore + tempRollScore };
};

const onesFives = (keptDice) => {
  checkOne(keptDice).length >= 1 ||
    checkFive(keptDice).length >= 1 ||
    (checkOne(keptDice).length >= 1 && checkFive(keptDice).length >= 1);
};

const onesFivesOutcome = (keptDice) => {
  return checkOne(keptDice).length * 100 + checkFive(keptDice).length * 50;
};

const endTurn = ({ score, roundScore, turnCounter }) => {
  return { score: score - roundScore, turnCounter: turnCounter + 1 };
};

const checkRemainingIsOne = (keptDice, multiple) => {
  return (
    Object.keys(checkMultiples(keptDice, multiple).counter).filter(
      (key) => checkMultiples(keptDice, multiple).counter[key] === 1
    )[0] == 1
  );
};

const checkRemainingIsFive = (keptDice, multiple) => {
  return (
  Object.keys(checkMultiples(keptDice, multiple).counter).filter(
    (key) => checkMultiples(keptDice, multiple).counter[key] === 1).includes('5') )
}

const diceFiveOfAKind = [
  { key: "dice1", value: 4 },
  { key: "dice2", value: 6 },
  { key: "dice3", value: 1 },
  { key: "dice4", value: 6 },
  { key: "dice5", value: 6 },
  { key: "dice6", value: 6 },
];

console.log(checkRemainingIsOne(diceFiveOfAKind, 4));

module.exports = { countScore, endTurn };
