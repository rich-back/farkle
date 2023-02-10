import { countScore } from "../Scoring/ScoringLogic";

export const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

export const checkForFarkle = ({ liveDice }) => {
  const runCheckScore = countScore({
    roundScore: 0,
    rollScore: 0,
    keptDice: liveDice,
  });
  return runCheckScore.rollScore === 0;
};

export const rollDice = ({ liveDice }) => {
  const tempDice = [...liveDice];
  const newDice = tempDice.map((di) => {
    const diKey = di.key;
    let diValue = di.value;
    diValue = getRandomNumber();
    return { key: diKey, value: diValue };
  });
  return { newDice: newDice };
};

export const dicePress = ({ itemKey, liveDice }) => {
  const tempLiveDice = liveDice.filter((di) => {
    return di.key !== itemKey;
  });
  const tempKeptDice = liveDice.filter((di) => {
    return di.key === itemKey;
  });
  return { tempLiveDice: tempLiveDice, tempKeptDice: tempKeptDice };
};
