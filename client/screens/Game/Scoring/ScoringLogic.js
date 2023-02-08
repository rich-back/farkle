import {
  checkFive,
  checkOne,
  checkMultiples,
  checkQuadPair,
} from "./ScoringLogicChecks";

// export const countScore = ({ roundScore, rollScore, keptDice }) => {
//   let tempRoundScore = roundScore;
//   let tempRollScore = rollScore;
//   keptDice.forEach((di) => {
//     if (di.value === 1) {
//       tempRollScore += 10;
//     } else if (di.value === 5) {
//       tempRollScore += 0;
//     }
//   });
//   return { roundScore: tempRoundScore + tempRollScore };
// };

const countScore = ({ roundScore, rollScore, keptDice }) => {
  let tempRoundScore = roundScore;
  let tempRollScore = rollScore;
  if (checkMultiples(keptDice, 6).length != 0) {
    tempRollScore += 3000;
  } else if (
    checkQuadPair(keptDice).length === 2 ||
    checkMultiples(keptDice, 2).length === 3 ||
    checkMultiples(keptDice, 1).length === 6
  ) {
    tempRollScore += 1500;
  }

  return { roundScore: tempRoundScore + tempRollScore };
};

const endTurn = ({ score, roundScore, turnCounter }) => {
  return { score: score - roundScore, turnCounter: turnCounter + 1 };
};

module.exports = { countScore, endTurn };
