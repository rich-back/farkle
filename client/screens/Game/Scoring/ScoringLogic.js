export const countScore = ({ roundScore, rollScore, liveDice }) => {
  let tempRoundScore = roundScore;
  let tempRollScore = rollScore;
  liveDice.forEach((di) => {
    if (di.value === 1) {
      tempRollScore += 10;
    } else if (di.value === 5) {
      tempRollScore += 0;
    }
  });
  return { roundScore: tempRoundScore + tempRollScore };
};

export const endTurn = ({ score, roundScore, turnCounter }) => {
  return { score: score - roundScore, turnCounter: turnCounter + 1 };
};
