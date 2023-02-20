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
  View,
} from "react-native";
import background from "../../assets/images/background.png";
import farkleModal from "../../assets/modals/farkle-modal.png";
import winnerModal from "../../assets/modals/winner-modal2.png";
import { GameTypeContext } from "../../global/GameContext";
import { dice } from "../../components/Dice";
import GameLogicScreen from "../../components/GamingLogic/GamingLogicComponent";
import ScoringScreen from "../../components/Scoring/ScoringComponent";
import arrowL from "../../assets/images/arrow.png";
import arrowR from "../../assets/images/arrowR.png";
import BackButton from "../../components/BackButton";

const Game = ({ navigation }) => {
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            setPlayer1({ playerName: "", score: 500 });
            setPlayer2({ playerName: "", score: 500 });
            navigation.navigate("Home");
          }}
        />
      ),
    });
  }, [navigation]);

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
          {currentPlayer.playerName == player1.playerName ? (
            <View className="">
              <Image className="absolute z-0" source={arrowL} />
              <Text className="font-virgil text-4xl">
                {player1.playerName}:{" "}
              </Text>
              <Text className="font-virgil text-4xl">{player1.score}</Text>
              {/* <Text className="font-virgil text-6xl pt-2"> ^</Text> */}
            </View>
          ) : (
            <View>
              <Text className="font-virgil text-2xl">
                {player1.playerName}:
              </Text>
              <Text className="font-virgil text-2xl">{player1.score}</Text>
            </View>
          )}
          <View className="flex-1 top-16">
            <Text className="font-virgil text-3xl text-center">
              Round Score: {roundScore}
            </Text>
          </View>
          {currentPlayer.playerName == player2.playerName ? (
            <View>
              <Image className="absolute right-8 z-0" source={arrowR} />
              <Text className="font-virgil text-4xl">
                {player2.playerName}:
              </Text>
              <Text className="font-virgil text-4xl">{player2.score}</Text>
              {/* <Text className="font-virgil text-6xl pt-2"> ^</Text> */}
            </View>
          ) : (
            <View>
              <Text className="font-virgil text-2xl">
                {player2.playerName}:
              </Text>
              <Text className="font-virgil text-2xl">{player2.score}</Text>
            </View>
          )}
        </View>

        <View className="flex-6">
          <GameLogicScreen
            bankedDice={bankedDice}
            counted={counted}
            disabled={disabled}
            hasSelectedDice={hasSelectedDice}
            keptDice={keptDice}
            liveDice={liveDice}
            playSound={playSound}
            rollScore={rollScore}
            roundScore={roundScore}
            setBankedDice={setBankedDice}
            setCounted={setCounted}
            setDisabled={setDisabled}
            setEndable={setEndable}
            setFarkleAlertVis={setFarkleAlertVis}
            setHasSelectedDice={setHasSelectedDice}
            setKeptDice={setKeptDice}
            setLiveDice={setLiveDice}
            setRollScore={setRollScore}
            setRoundScore={setRoundScore}
          />
        </View>
        <View className="flex-1">
          <ScoringScreen
            bankedDice={bankedDice}
            counted={counted}
            disabled={disabled}
            endable={endable}
            hasSelectedDice={hasSelectedDice}
            keptDice={keptDice}
            liveDice={liveDice}
            playSound={playSound}
            rollScore={rollScore}
            roundScore={roundScore}
            setBankedDice={setBankedDice}
            setCounted={setCounted}
            setDisabled={setDisabled}
            setEndable={setEndable}
            setEndGameAlertVis={setEndGameAlertVis}
            setHasSelectedDice={setHasSelectedDice}
            setKeptDice={setKeptDice}
            setLiveDice={setLiveDice}
            setRollScore={setRollScore}
            setRoundScore={setRoundScore}
            setTurnCounter={setTurnCounter}
            turnCounter={turnCounter}
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
