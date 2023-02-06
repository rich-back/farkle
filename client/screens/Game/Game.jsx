import { useState } from "react";
import { Text, View } from "react-native";
import GameLogic from "./GameLogic";
import ScoringLogic from "./ScoringLogic";

const Game = () => {
  const [score, setScore] = useState(10000);
  const [roundScore, setRoundScore] = useState(0);
  const [liveDice, setLiveDice] = useState();
  const [keptDice, setKeptDice] = useState();
  const [counted, setCounted] = useState(false);
  const [turnCounter, setTurnCounter] = useState(1);
  const [dice, setDice] = useState([
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ]);

  const keepDi = () => {
    setKeptDice();
  }


  return (
    <View>
      <GameLogic
        dice={dice}
        keepDi = {keepDi}
        keptDice={keptDice}
        liveDice={liveDice}
        setCounted={setCounted}
        setDice={setDice}
      />
      <ScoringLogic
        counted={counted}
        dice={dice}
        keptDice={keptDice}
        liveDice={liveDice}
        roundScore={roundScore}
        score={score}
        turnCounter={turnCounter}
        setCounted={setCounted}
        setDice={setDice}
        setKeptDice={setKeptDice}
        setLiveDice={setLiveDice}
        setRoundScore={setRoundScore}
        setScore={setScore}
        setTurnCounter={setTurnCounter}
      />
      <Text>Score: {score}</Text>
      <Text>Round Score: {roundScore}</Text>
    </View>
  );
};
export default Game;
