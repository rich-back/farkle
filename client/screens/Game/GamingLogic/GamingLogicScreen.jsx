import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { diceImages } from "../Dice";
import { checkForFarkle, dicePress, rollDice } from "./GameLogic";
import { useEffect, useState } from "react";

const GameLogicScreen = ({
  counted,
  keptDice,
  liveDice,
  setCounted,
  setFarkleAlertVis,
  setKeptDice,
  setLiveDice,
  setRoundScore,
  setDisabled,
  disabled,
  setHasSelectedDice,
}) => {
  const [clickCounter, setClickCounter] = useState(0);

  useEffect(() => {
    console.log(liveDice);
    runCheckForFarkle();
  }, [clickCounter]);

  const clickRollDice = () => {
    if (counted) {
      const rolledDice = rollDice({ liveDice });
      setLiveDice(rolledDice.newDice);
      setCounted(false);
      setDisabled(false);
      setClickCounter(clickCounter + 1);
    }
  };

  const runCheckForFarkle = () => {
    const isFarkle = checkForFarkle({ liveDice });
    if (isFarkle) {
      setFarkleAlertVis(true);
      setRoundScore(0);
      setKeptDice([]);
    }
  };

  const dicePressed = (itemKey) => {
    const dicePressHandler = dicePress({ itemKey, liveDice });
    setLiveDice(dicePressHandler.tempLiveDice);
    setKeptDice(keptDice.concat(dicePressHandler.tempKeptDice));
    setHasSelectedDice(false)
  };

  return (
    <View>
      <Text>Live Dice</Text>
      <FlatList
        data={liveDice}
        renderItem={({ item }) => (
          <View style={styles.diceContainer}>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => dicePressed(item.key)}
            >
              <Image source={diceImages[item.value - 1]} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text>Kept Dice</Text>
      <FlatList
        data={keptDice}
        renderItem={({ item }) => (
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => dicePressed(item.key)}>
              <Image source={diceImages[item.value - 1]} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Roll the dice" onPress={clickRollDice} />
    </View>
  );
};

const styles = StyleSheet.create({
  diceContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
});

export default GameLogicScreen;
