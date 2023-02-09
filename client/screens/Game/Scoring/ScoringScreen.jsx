import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { countScore, endTurn } from "./ScoringLogic";
import { dice } from "../Dice";

const ScoringScreen = ({
  counted,
  keptDice,
  roundScore,
  turnCounter,
  setCounted,
  setLiveDice,
  setTurnCounter,
  setEndGameAlertVis,
  setRoundScore,
  setKeptDice,
}) => {
  const [rollScore, setRollScore] = useState(0);
  const [score, setScore] = useState(40);

  useEffect(() => {
    completeGame();
  }, [score]);

  const completeGame = () => {
    if (score <= 0) {
      setEndGameAlertVis(true);
    }
  };

  const clickCountScore = () => {
    if (!counted) {
      const newCountState = countScore({
        roundScore,
        rollScore,
        keptDice,
      });
      setRoundScore(newCountState.roundScore);
      setCounted(true);
      setRollScore(0);
    }
  };

  const clickEndTurn = () => {
    const endTurnState = endTurn({ score, roundScore, turnCounter });
    setScore(endTurnState.score);
    setTurnCounter(endTurnState.turnCounter);
    setRoundScore(0);
    setLiveDice(dice);
    setKeptDice([]);
  };

  return (
    <View>
      <Text></Text>
      <Button title="count score" onPress={clickCountScore} />
      <Text></Text>
      <Button title="end round" onPress={clickEndTurn} />
      <Text>Turn: {turnCounter}</Text>
      <Text>Score: {score}</Text>
      <Text>Round Score: {roundScore}</Text>
    </View>
  );
};

export default ScoringScreen;
