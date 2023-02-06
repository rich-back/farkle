import React, { useState } from "react";
import { Button, FlatList, View, StyleSheet, Text } from "react-native";

const GameLogic = ({ dice, setDice, setCounted, keepDi }) => {
  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  };

  const rollDice = () => {
    const tempDice = dice;
    const newDice = tempDice.map((di) => {
      const diKey = di.key;
      let diValue = di.value;
      diValue = getRandomNumber();
      return { key: diKey, value: diValue };
    });
    setDice(newDice);
    setCounted(false);
  };

  return (
    <View>
      <FlatList
        data={dice}
        renderItem={({ item }) => (
          <>
            <Text>{item.value}</Text>
            <Button title={item.key} onPress={keepDi}/>
          </>
        )}
      />
      <Button title="Roll the dice" onPress={rollDice}/>
    </View>
  );
};

export default GameLogic;
