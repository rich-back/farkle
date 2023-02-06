import React, { useState } from "react";
import { Button, FlatList, View, StyleSheet, Text, Image } from "react-native";

const GameLogic = ({
  counted,
  dice,
  setDice,
  setCounted,
  keepDi,
  setFarkleAlertVis,
  diceImages,
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
          <View style={styles.diceContainer}>
            <Image 
              source={diceImages[item.value -1]}
              style={styles.image}
             />
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
