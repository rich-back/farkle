import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import rollButton from "../../assets/buttons/roll-button.png";
import fail from "../../assets/sounds/fail.wav";
import shakeSound from "../../assets/sounds/RATTLE.wav";
import diceKeptPressSound from "../../assets/sounds/smrpg_click.wav";
import diceLivePressSound from "../../assets/sounds/take.wav";
import CustomButton from "../Button";
import { diceImages } from "../Dice";
import {
  checkForFarkle,
  keptDicePress,
  liveDicePress,
  rollDice,
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
      <View className="">
        <Text className="font-virgil text-2xl text-center">Live Dice</Text>
        <FlatList
          className="h-[160px] w-[300px] self-center"
          numColumns={3}
          data={liveDice}
          renderItem={({ item }) => (
            <View className="w-[100px] h-[80px] justify-center content-center items-center">
              <TouchableOpacity
                disabled={disabled}
                onPress={() => dicePressedLive(item.key)}
              >
                <Image
                  source={diceImages[item.value - 1]}
                  className="w-[70px] h-[70px] m-1"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text className="font-virgil text-2xl text-center">Kept Dice</Text>
        <FlatList
          className="flex h-[55px] w-[330px] mb-2 self-center"
          horizontal={true}
          data={keptDice}
          renderItem={({ item }) => (
            <View className="h-[55px] w-[55px] items-center justify-center">
              <TouchableOpacity onPress={() => dicePressedKept(item.key)}>
                <Image
                  source={diceImages[item.value - 1]}
                  className="h-[50px] w-[50px]"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View className="w-38 mt-2 self-center">
        <CustomButton imageSource={rollButton} onPress={clickRollDice} />
      </View>
    </View>
  );
};


export default GameLogicScreen;
