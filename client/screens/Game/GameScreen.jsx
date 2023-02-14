import { Audio } from "expo-av";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import background from "../../assets/background.png";
import modalButton from "../../assets/buttons/modalButton.png";
import farkleModal from "../../assets/modals/farkle-modal.png";
import winnerModal from "../../assets/modals/winner-modal2.png";
import { GameTypeContext } from "../../global/GameContext";
import { dice } from "./Dice";
import GameLogicScreen from "./GamingLogic/GamingLogicScreen";
import ScoringScreen from "./Scoring/ScoringScreen";

const Game = () => {
  const {
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    currentPlayer,
    setCurrentPlayer,
  } = useContext(GameTypeContext);
  const [liveDice, setLiveDice] = useState(dice);
  const [keptDice, setKeptDice] = useState([]);
  const [bankedDice, setBankedDice] = useState([]);
  const [counted, setCounted] = useState(true);
  const [rollScore, setRollScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [turnCounter, setTurnCounter] = useState(1);
  const [farkleAlertVis, setFarkleAlertVis] = useState(false);
  const [endGameAlertVis, setEndGameAlertVis] = useState(false);
  const [endable, setEndable] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [hasSelectedDice, setHasSelectedDice] = useState(true);
  const [sound, setSound] = useState();

  const playSound = useCallback(async (soundItem) => {
    const { sound } = await Audio.Sound.createAsync(soundItem);
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

  const handleEndGame = () => {
    setEndGameAlertVis(false);
    setCurrentPlayer(player1);
    setPlayer1({ ...player1, score: 500 });
    setPlayer2({ ...player2, score: 500 });
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView className="h-full flex-1 justify-between mr-5 ml-5 mt-3">
        <View className="flex-1 flex-row justify-between m-2">
          {currentPlayer.name == player1.name ? (
            <View className="">
              <Text className="font-virgil text-4xl">{player1.name}: </Text>
              <Text className="font-virgil text-4xl">{player1.score}</Text>
              <Text className="font-virgil text-6xl pt-2"> ^</Text>
            </View>
          ) : (
            <View>
              <Text className="font-virgil text-2xl">{player1.name}:</Text>
              <Text className="font-virgil text-2xl">{player1.score}</Text>
            </View>
          )}
          <View className="flex-1 top-16">
            <Text className="font-virgil text-3xl text-center">
              Round Score: {roundScore}
            </Text>
          </View>
          {currentPlayer.name == player2.name ? (
            <View>
              <Text className="font-virgil text-4xl">{player2.name}:</Text>
              <Text className="font-virgil text-4xl">{player2.score}</Text>
              <Text className="font-virgil text-6xl pt-2"> ^</Text>
            </View>
          ) : (
            <View>
              <Text className="font-virgil text-2xl">{player2.name}:</Text>
              <Text className="font-virgil text-2xl">{player2.score}</Text>
            </View>
          )}
        </View>

        <View className="flex-6">
          <GameLogicScreen
            counted={counted}
            keptDice={keptDice}
            liveDice={liveDice}
            bankedDice={bankedDice}
            rollScore={rollScore}
            roundScore={roundScore}
            setCounted={setCounted}
            setFarkleAlertVis={setFarkleAlertVis}
            setKeptDice={setKeptDice}
            setLiveDice={setLiveDice}
            setBankedDice={setBankedDice}
            setRollScore={setRollScore}
            setRoundScore={setRoundScore}
            disabled={disabled}
            setDisabled={setDisabled}
            setHasSelectedDice={setHasSelectedDice}
            hasSelectedDice={hasSelectedDice}
            playSound={playSound}
          />
        </View>
        <View className="flex-1">
          <ScoringScreen
            setHasSelectedDice={setHasSelectedDice}
            hasSelectedDice={hasSelectedDice}
            endable={endable}
            counted={counted}
            keptDice={keptDice}
            liveDice={liveDice}
            bankedDice={bankedDice}
            rollScore={rollScore}
            roundScore={roundScore}
            turnCounter={turnCounter}
            setEndable={setEndable}
            setCounted={setCounted}
            setEndGameAlertVis={setEndGameAlertVis}
            setKeptDice={setKeptDice}
            setLiveDice={setLiveDice}
            setBankedDice={setBankedDice}
            setRollScore={setRollScore}
            setRoundScore={setRoundScore}
            setTurnCounter={setTurnCounter}
            disabled={disabled}
            setDisabled={setDisabled}
            playSound={playSound}
          />
        </View>

        <Modal
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent={true}
          visible={farkleAlertVis}
        >
          <View style={styles.centeredView}>
            <Pressable onPress={() => setFarkleAlertVis(false)}>
              <View style={styles.modalImage}>
                <Image source={farkleModal} />
              </View>
            </Pressable>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent={true}
          visible={endGameAlertVis}
        >
          <View style={styles.centeredView}>
            <Pressable
              onPress={() => {
                handleEndGame();
              }}
            >
              <Image source={winnerModal} />
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    opacity: 80,
    elevation: 50,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    marginBottom: 250,
    backgroundColor: "transparent",
    width: 350,
    height: 200,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    elevation: 9,
  },

  modalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});

export default Game;
