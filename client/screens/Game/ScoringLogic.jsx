import { useState } from "react";
import { Button, View, Text } from "react-native";
const ScoringLogic = ({
  counted,
  dice,
  keptDice,
  liveDice,
  turnCounter,
  setCounted,
  setTurnCounter,
}) => {
  const [rollScore, setRollScore] = useState(0);
	const [roundScore, setRoundScore] = useState(0);
	const [score, setScore] = useState(10000);

	const endTurn = () => {
		let tempScore = score;
		let tempRoundScore = roundScore;
		setScore(tempScore - tempRoundScore);
		let tempTurnCounter = turnCounter += 1;
		setTurnCounter(tempTurnCounter);
		setRoundScore(0);
	}

  const countScore = () => {
    if (!counted) {
      let tempRoundScore = roundScore;
      let tempRollScore = rollScore;
      dice.forEach((di) => {
        if (di.value === 1) {
          tempRollScore += 10;
        } else if (di.value === 5) {
          tempRollScore += 0;
        }
      });
      setRoundScore((tempRoundScore += tempRollScore));
      setRollScore(tempRollScore);
      setCounted(true);
			setRollScore(0);
    }
  };

  return (
    <View>
      <Button title="count score" onPress={countScore}/>
      <Button title="end round" onPress={endTurn}/>
			<Text>Turn: {turnCounter}</Text>
			<Text>Score: {score}</Text>
      <Text>Round Score: {roundScore}</Text>
    </View>
  );
};
export default ScoringLogic;