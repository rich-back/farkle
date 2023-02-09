import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {dice, diceImages} from "../Dice";
import GameLogic, { checkForFarkle, dicePress, rollDice } from "./GameLogic";

const GameLogicScreen = ({
  counted,
  keptDice,
  liveDice,
  setCounted,
  setFarkleAlertVis,
  setKeptDice,
  setLiveDice,
  setRoundScore,
}) => {
  const runCheckForFarkle = () => {
    const isFarkle = checkForFarkle(liveDice);
    if (isFarkle) {
      setFarkleAlertVis(true);
      setRoundScore(0);
      setLiveDice(dice);
    }
  };

  const clickRollDice = () => {
    if (counted) {
      const rolledDice = rollDice({ liveDice });
      setLiveDice(rolledDice.newDice);
      runCheckForFarkle(rolledDice.newDice);
      setCounted(false);
    }
  };

  const dicePressed = (itemKey) => {
    const dicePressHandler = dicePress({ itemKey, liveDice });
    setLiveDice(dicePressHandler.tempLiveDice);
    setKeptDice(keptDice.concat(dicePressHandler.tempKeptDice));
  };

  return (
    <View>
      <Text>Live Dice</Text>
      <FlatList
        data={liveDice}
        renderItem={({ item }) => (
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => dicePressed(item.key)}>
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
