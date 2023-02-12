import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { GameTypeContext } from "../../../global/GameContext";
import { dice } from "../Dice";
import { countScore, endTurn } from "./ScoringLogic";

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
  setDisabled,
  hasSelectedDice,
  setHasSelectedDice,
}) => {
  const [rollScore, setRollScore] = useState(0);
  const {
    player1,
    player2,
    currentPlayer,
    setCurrentPlayer,
    setPlayer1,
    setPlayer2,
  } = useContext(GameTypeContext);
  const score = currentPlayer.score;

  useEffect(() => {
    completeGame();
  }, [score]);

  useEffect(() => {
    // ! Added this logic to cope with 2 players
    if (currentPlayer.name === player1.name) {
      setCurrentPlayer(player2);
    } else {
      setCurrentPlayer(player1);
    }
  }, [turnCounter])
  

  const completeGame = () => {
    if (score <= 0) {
      setEndGameAlertVis(true);
      clickEndTurn();
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
      setDisabled(true);
    }
    setHasSelectedDice(true);
    setEndable(true);
  };

  const clickEndTurn = () => {
    if (endable == true) {
      const endTurnState = endTurn({ score, roundScore, turnCounter });
      // !trial
      if (currentPlayer.name === player1.name) {
        setPlayer1({ ...player1, score: endTurnState.score });
      } else {
        setPlayer2({ ...player2, score: endTurnState.score });
      }
      // setScore(endTurnState.score);
      setTurnCounter(endTurnState.turnCounter);
      setRoundScore(0);
      setLiveDice(dice);
      setKeptDice([]);
      setHasSelectedDice(true);
      setCounted(true);
    }
    setEndable(false);
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
      {/* //! Scoring logic player dependent */}
      <Text>Score: {currentPlayer.score}</Text>
      <Text>Round Score: {roundScore}</Text>
    </View>
  );
};

export default ScoringScreen;
