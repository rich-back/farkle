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
    tempRollScore += 2000 + extraScoringDiceChecker(keptDice, 5);
  } else if (
    checkQuadPair(keptDice) === true ||
    checkMultiples(keptDice, 2).matched.length === 3 ||
    checkMultiples(keptDice, 1).matched.length === 6
  ) {
    tempRollScore += 1500;
  } else if (checkMultiples(keptDice, 4).matched.length === 1) {
    tempRollScore += 1000 + extraScoringDiceChecker(keptDice, 4);
  } else if (checkMultiples(keptDice, 3).matched.length === 1) {
    tempRollScore +=
      checkMultiples(keptDice, 3).matched * 100 +
      extraScoringDiceChecker(keptDice, 3);
  } else {
    tempRollScore += onesFivesOutcome(keptDice);
  }
  return { roundScore: tempRoundScore + tempRollScore, rollScore: tempRollScore };
};

const onesFivesOutcome = (keptDice) => {
  return checkOne(keptDice).length * 100 + checkFive(keptDice).length * 50;
};

const endTurn = ({ score, roundScore, turnCounter }) => {
  return { score: score - roundScore, turnCounter: turnCounter + 1 };
};

const extraScoringDiceChecker = (keptDice, multiple) => {
  const keys = Object.keys(checkMultiples(keptDice, multiple).counter).filter(
    (key) => checkMultiples(keptDice, multiple).counter[key] !== multiple
  );
  const values = Object.values(
    checkMultiples(keptDice, multiple).counter
  ).filter((item) => item !== multiple);
  const newArray = [];
  for (let i = 0; i < keys.length; i++) {
    newArray.push({ key: keys[i], value: values[i] });
  }
  let total = 0;
  const ones = newArray.find((element) => element.key == 1) || {
    key: 0,
    value: 0,
  };
  const fives = newArray.find((element) => element.key == 5) || {
    key: 0,
    value: 0,
  };
  total += ones.value * 100 + fives.value * 50;
  return total;
};

module.exports = { countScore, endTurn };
