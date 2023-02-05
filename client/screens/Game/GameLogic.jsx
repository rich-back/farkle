import React, { useState } from "react";
import { Button, FlatList, View, StyleSheet, Text } from "react-native";

const GameLogic = ({dice, setDice}) => {

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
        renderItem={({ item }) => <><Text>{item.value}</Text><Button title="Keep"></Button></>}
      ></FlatList>
      <Button title="Roll the dice" onPress={updateDice}></Button>
    </View>
  );
};

export default GameLogic;
