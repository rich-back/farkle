import React, { useState } from "react";
import {
  Button,
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
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
          <>
            <TouchableOpacity onPress={() => dicePressHandler(item.key)}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          </>
        )}
      />
      <Button title="Roll the dice" onPress={rollDice} />
    </View>
  );
};

export default GameLogic;
