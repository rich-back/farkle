import React, { useState } from "react";
import { Button, FlatList, View, StyleSheet, Text } from "react-native";

const GameLogic = ({
  counted,
  dice,
  setDice,
  setCounted,
  keepDi,
  setFarkleAlertVis,
}) => {
  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  };

  const checkForFarkle = (dice) => {
    let filteredDice = dice.filter((di) => {
      return di.value === 1 || di.value === 5;
    });
    if (filteredDice.length === 0) {
      setFarkleAlertVis(true);
    }
  };

  const rollDice = () => {
    if (counted) {
      const tempDice = dice;
      const newDice = tempDice.map((di) => {
        const diKey = di.key;
        let diValue = di.value;
        diValue = getRandomNumber();
        return { key: diKey, value: diValue };
      });
      setDice(newDice);
      checkForFarkle(newDice);
      setCounted(false);
    }
  };

  return (
    <View>
      <FlatList
        data={dice}
        renderItem={({ item }) => (
          <>
            <Text>{item.value}</Text>
            <Button title={item.key} onPress={keepDi} />
          </>
        )}
      />
      <Button title="Roll the dice" onPress={rollDice} />
    </View>
  );
};

export default GameLogic;
