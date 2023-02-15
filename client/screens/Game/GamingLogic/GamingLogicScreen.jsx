import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import rollButton from "../../../assets/buttons/roll-button.png";
import fail from "../../../assets/sounds/fail.wav";
import shakeSound from "../../../assets/sounds/RATTLE.wav";
import diceKeptPressSound from "../../../assets/sounds/smrpg_click.wav";
import { diceLivePressSound } from "../../../assets/sounds/take.wav";
import CustomButton from "../../../components/Button";
import { diceImages  } from "../Dice";
import {
  checkForFarkle,
  keptDicePress,
  liveDicePress,
  rollDice
} from "./GameLogic";

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
  setEndable,
  setRoundScore,
  setDisabled,
  disabled,
  setHasSelectedDice,
  playSound,
}) => {
  const [clickCounter, setClickCounter] = useState(0);

  useEffect(() => {
    runCheckForFarkle();
  }, [clickCounter]);

  const clickRollDice = () => {
    if (counted) {
      const rolledDice = rollDice({ liveDice });
      setLiveDice(rolledDice.newDice);
      // * setLiveDice(farkleDice) used to check for issues with 6 dice farkle
      setCounted(false);
      setDisabled(false);
      setClickCounter(clickCounter + 1);
      playSound(shakeSound);
    }
  };

  const runCheckForFarkle = () => {
    const isFarkle = checkForFarkle({ liveDice });
    if (isFarkle) {
      setFarkleAlertVis(true);
      setRoundScore(0);
      setKeptDice([]);
      playSound(fail);
      setEndable(true);
    }
  };

  const dicePressedLive = (itemKey) => {
    const dicePressHandler = liveDicePress({ itemKey, liveDice });
    setLiveDice(dicePressHandler.tempLiveDice);
    setKeptDice(keptDice.concat(dicePressHandler.tempKeptDice));
    setHasSelectedDice(false);
    playSound(diceLivePressSound);
  };

  const dicePressedKept = (itemKey) => {
    const dicePressHandler = keptDicePress({ itemKey, keptDice });
    setKeptDice(dicePressHandler.tempKeptDice);
    setLiveDice(liveDice.concat(dicePressHandler.tempLiveDice));
    setHasSelectedDice(false);
    playSound(diceKeptPressSound);
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
                  style={{
                    flex: 1,
                    height: 70,
                    resizeMode: "contain",
                    width: 70,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View className="w-38 mt-24 flex self-center">
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
});

export default GameLogicScreen;
