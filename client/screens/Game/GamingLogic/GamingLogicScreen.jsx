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
import {
  checkForFarkle,
  liveDicePress,
  keptDicePress,
  rollDice,
} from "./GameLogic";
import { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";

import shakeSound from "../../../assets/RATTLE.wav";
import rollButton from "../../../assets/buttons/rollButton.png";
import CustomButton from "../../../components/Button";

const GameLogicScreen = ({
  counted,
  keptDice,
  liveDice,
  bankedDice,
  setCounted,
  setFarkleAlertVis,
  setKeptDice,
  setLiveDice,
  setBankedDice,
  setRoundScore,
  setDisabled,
  disabled,
  setHasSelectedDice,
}) => {
  const [clickCounter, setClickCounter] = useState(0);

  const [sound, setSound] = useState();

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(shakeSound);
    setSound(sound);
    await sound.playAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    runCheckForFarkle();
  }, [clickCounter]);

  const clickRollDice = () => {
    if (counted) {
      const rolledDice = rollDice({ liveDice });
      setLiveDice(rolledDice.newDice);
      setCounted(false);
      setDisabled(false);
      setClickCounter(clickCounter + 1);
      playSound();
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

  const dicePressedLive = (itemKey) => {
    const dicePressHandler = liveDicePress({ itemKey, liveDice });
    setLiveDice(dicePressHandler.tempLiveDice);
    setKeptDice(keptDice.concat(dicePressHandler.tempKeptDice));
    setHasSelectedDice(false);
  };
  const dicePressedKept = (itemKey) => {
    const dicePressHandler = keptDicePress({ itemKey, keptDice });
    setKeptDice(dicePressHandler.tempKeptDice);
    setLiveDice(liveDice.concat(dicePressHandler.tempLiveDice));
    setHasSelectedDice(false);
  };

  return (
    <View className="flex">
      <View>
        <Text className="font-virgil text-3xl text-center">Live Dice</Text>
        <FlatList
          contentContainerStyle={styles.liveFlatList}
          numColumns={3}
          data={liveDice}
          renderItem={({ item }) => (
            <View style={styles.liveDiceContainer}>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => dicePressedLive(item.key)}
              >
                <Image
                  source={diceImages[item.value - 1]}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text className="font-virgil text-3xl text-center">Kept Dice</Text>
        <FlatList
          contentContainerStyle={styles.keptFlatList}
          horizontal={true}
          data={keptDice}
          renderItem={({ item }) => (
            <View style={styles.keptDiceContainer}>
              <TouchableOpacity onPress={() => dicePressedKept(item.key)}>
                <Image
                  source={diceImages[item.value - 1]}
                  style={{flex:1, height: 70, resizeMode:"contain", width: 70}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View className="w-36 mt-24 flex self-center">
        <CustomButton imageSource={rollButton} onPress={clickRollDice} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  liveFlatList: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  keptFlatList: {
    height: 100,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  liveDiceContainer: {
    width: 100,
    height: 150,
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // borderColor: 'red',
    // borderWidth: 2,
  },
  keptDiceContainer: {
    maxWidth: 100,
    maxHeight: 100,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: 'green',
    // borderWidth: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginBottom: 10,
  },
});

export default GameLogicScreen;
