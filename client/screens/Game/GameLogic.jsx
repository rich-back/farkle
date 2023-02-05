import React, { useState } from "react";
import { Button, FlatList, View, StyleSheet, Text } from "react-native";

const GameLogic = () => {
  const [dice, setDice] = useState([
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ]);

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  };

  const updateDice = () => {
    const tempDice = dice;
    const newDice = tempDice.map((di) => {
      const diKey = di.key;
      let diValue = di.value;
      diValue = getRandomNumber();
      return { key: diKey, value: diValue };
    });
    setDice(newDice);
  };

  return (
    <View>
      <FlatList
        data={dice}
        renderItem={({ item }) => <Text>{item.value}</Text>}
      ></FlatList>
      <Button title="Roll the dice" onPress={updateDice}></Button>
    </View>
  );
};

export default GameLogic;
