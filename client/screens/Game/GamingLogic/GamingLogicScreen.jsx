import {
  Button,
  FlatList,
  Image,
  ImageBackground,
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
        contentContainerStyle={styles.liveFlatList}
        numColumns={3}
        data={liveDice}
        renderItem={({ item }) => (
          <View style={styles.liveDiceContainer}>
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
        contentContainerStyle={styles.keptFlatList}
        horizontal={true}
        data={keptDice}
        renderItem={({ item }) => (
          <View style={styles.keptDiceContainer}>
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

  liveFlatList: {
    borderColor: 'purple',
    borderWidth: 1,
    height: 200,
    width: 300,
    marginHorizontal: '15%',
    marginTop: 10,
    marginBottom: 10,
    
    
  },
  keptFlatList: {
    height: 100,
    width: '100%',
    borderColor: 'yellow',
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    

  },
  liveDiceContainer: {
    width: 100,
    height: 100,
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: "center",
    // borderColor: 'red',
    // borderWidth: 2,
  },
  keptDiceContainer: {
    maxWidth: 100,
    maxHeight: 100,
    // flex: 1,
    alignItems: "center",
    justifyContent: 'center'
    // borderColor: 'green',
    // borderWidth: 2,
    
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: 5,
    
  },
});

export default GameLogicScreen;
