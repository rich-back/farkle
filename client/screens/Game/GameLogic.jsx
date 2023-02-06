import React, { useState } from "react";
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

const GameLogic = ({
  counted,
  dice,
  keptDice,
  liveDice,
  setCounted,
  setDice,
  setFarkleAlertVis,
  setKeptDice,
  setLiveDice,

  diceImages,
}) => {
  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  };

  const checkForFarkle = (liveDice) => {
    let filteredDice = liveDice.filter((di) => {
      return di.value === 1 || di.value === 5;
    });
    if (filteredDice.length === 0) {
      setFarkleAlertVis(true);
    }
  };

  const rollDice = () => {
    if (counted) {
      const tempDice = liveDice;
      const newDice = tempDice.map((di) => {
        const diKey = di.key;
        let diValue = di.value;
        diValue = getRandomNumber();
        return { key: diKey, value: diValue };
      });
      setLiveDice(newDice);
      checkForFarkle(newDice);
      setCounted(false);
    }
  };

  const dicePressHandler = (itemKey) => {
    const tempLiveDice = liveDice.filter((di) => {
      return di.key !== itemKey;
    });
    const tempKeptDice = dice.filter((di) => {
      return di.key === itemKey;
    });
    setLiveDice(tempLiveDice);
    setKeptDice(tempKeptDice);
  };

  return (
    <View>
      <FlatList
        data={liveDice}
        renderItem={({ item }) => (
          <View style={styles.diceContainer}>
            <TouchableOpacity onPress={() => dicePressHandler(item.key)}>
            <Image 
              source={diceImages[item.value -1]}
              style={styles.image}
             />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Roll the dice" onPress={rollDice} />
    </View>
  );
};

const styles = StyleSheet.create({
  diceContainer:{
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  }
})

export default GameLogic;
