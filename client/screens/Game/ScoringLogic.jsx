import { useState } from "react";
import { Button, View, Text } from "react-native";
const ScoringLogic = ({
  dice,
  liveDice,
  keptDice,
  roundScore,
  setRoundScore,
  score,
  setScore,
}) => {
  const [rollScore, setRollScore] = useState(0);

  const countScore = () => {
    setRollScore(0);
    let tempRoundScore = roundScore;
    let tempRollScore = rollScore;
    let tempScore = score;
    dice.forEach((di) => {
      if (di.value === 1) {
        tempRollScore += 100;
      } else if (di.value === 5) {
        tempRollScore += 50;
      }
    });
    setRoundScore((roundScore += tempRollScore));
    setRollScore(tempRollScore);
    setScore(tempScore - tempRollScore);
  };

  return (
    <View>
      <Button title="count score" onPress={countScore}></Button>
      {rollScore === 0 ? <Button title="next round"></Button> : null}
    </View>
  );
};
export default ScoringLogic;
