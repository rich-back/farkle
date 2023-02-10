import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { countScore, endTurn } from "./ScoringLogic";
import { dice } from "../Dice";

const ScoringScreen = ({
  counted,
  endable,
  keptDice,
  roundScore,
  turnCounter,
  setCounted,
  setLiveDice,
  setTurnCounter,
  setEndGameAlertVis,
  setRoundScore,
  setKeptDice,
  setEndable,
}) => {
  const [rollScore, setRollScore] = useState(0);
  const [score, setScore] = useState(40);
  const [hasSelectedDice, setHasSelectedDice] = useState(false);

  useEffect(() => {
    completeGame();
  }, [score]);

  useEffect(() => {
    setHasSelectedDice(!hasSelectedDice);
  }, [keptDice]);

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
    setEndable(true);
  };

  const clickEndTurn = () => {
    if (endable == true) {
      const endTurnState = endTurn({ score, roundScore, turnCounter });
      setScore(endTurnState.score);
      setTurnCounter(endTurnState.turnCounter);
      setRoundScore(0);
      setLiveDice(dice);
      setKeptDice([]);
      console.log("endable");
    }
    setEndable(false);
    console.log("not endable");
  };

  return (
    <View>
      <Text></Text>
      {!hasSelectedDice ? (
        <Button title="count score" onPress={clickCountScore} />
      ) : null}
      <Text></Text>
      <Button title="end round" onPress={clickEndTurn} />
      <Text>Turn: {turnCounter}</Text>
      <Text>Score: {score}</Text>
      <Text>Round Score: {roundScore}</Text>
    </View>
  );
};

export default ScoringScreen;
