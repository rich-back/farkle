import { useState } from "react";
import { View, Text } from "react-native";
import GameLogic from "./GameLogic";
import ScoringLogic from './ScoringLogic';

const Game = () => {

  const [score, setScore] = useState(10000)
  const [roundScore, setRoundScore] = useState(0)
  const [liveDice, setLiveDice] = useState()
  const [keptDice, setKeptDice] = useState()

  const [dice, setDice] = useState([
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ]);

  return (
    <View>
      <GameLogic dice={dice} setDice={setDice} liveDice={liveDice} keptDice={keptDice}/>
      <ScoringLogic dice={dice} setDice={setDice} liveDice={liveDice} setLiveDice={setLiveDice} keptDice={keptDice} setKeptDice={setKeptDice} score={score} setScore={setScore} roundScore={roundScore} setRoundScore={setRoundScore}/>
      <Text>Score {score}</Text>
      <Text>Rolling Score {roundScore}</Text>
    </View>
  );
};
export default Game;
