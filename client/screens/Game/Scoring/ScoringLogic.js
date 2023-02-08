import { checkFive, checkOne, checkMultiples, checkQuadPair } from "./ScoringLogicChecks";


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

const endTurn = ({ score, roundScore, turnCounter }) => {
  return { score: score - roundScore, turnCounter: turnCounter + 1 };
};

module.exports={ countScore, endTurn }
