import { useState } from "react";
import { Button, View, Text } from "react-native";
const ScoringLogic = ({
  dice,
  liveDice,
  keptDice,
  rollingScore,
  setRollingScore,
  score,
  setScore,
}) => {
  const [counter, setCounter] = useState(0);

  const scores = [
    { value: 1, score: 100 },
    { value: 5, score: 50 },
  ];

  const countScore = () => {
    let tempRollingScore = rollingScore;
    dice.forEach((di) => {
      if (di.value == 1) {
        tempRollingScore += 100;
      } else if (di.value == 5) {
        tempRollingScore += 50;
      }
    });
    setRollingScore(tempRollingScore);
    let tempScore = score;
    setScore(tempScore - tempRollingScore);
  };

  return (
    <View>
      <Button title="count score" onPress={countScore}></Button>
    </View>
  );
};
export default ScoringLogic;
