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
import { GameTypeContext } from "../../global/GameContext";
import { dice } from "../../components/Dice";
import GameLogicScreen from "../../components/GamingLogic/GamingLogicComponent";
import ScoringScreen from "../../components/Scoring/ScoringComponent";
import arrowL from "../../assets/images/arrow.png";
import arrowR from "../../assets/images/arrowR.png";
import BackButton from "../../components/BackButton";
import winnerModal from "../../assets/modals/post-it-blankL.png";

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
    setPlayer1({ ...player1, score: player1.score });
    setPlayer2({ ...player2, score: player2.score });
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView className="h-screen flex-1 justify-between mr-5 ml-5 mt-3">
        <View className="flex-1 justify-evenly">
          <View className="flex-none">
            <View className="flex-row justify-between">
              {currentPlayer.playerName == player1.playerName ? (
                <View className="">
                  {/* <Image className="absolute z-0" source={arrowL} /> */}
                  <Text className="font-virgil text-2xl">
                    {player1.playerName}:{" "}
                  </Text>
                  <Text className="font-virgil text-2xl">{player1.score}</Text>
                </View>
              ) : (
                <View>
                  <Text className="font-virgil text-gray-400 text-lg">
                    {player1.playerName}:
                  </Text>
                  <Text className="font-virgil text-gray-400 text-lg">
                    {player1.score}
                  </Text>
                </View>
              )}

              {currentPlayer.playerName == player2.playerName ? (
                <View>
                  {/* <Image className="absolute right-8 z-0" source={arrowR} /> */}
                  <Text className="font-virgil text-2xl">
                    {player2.playerName}:
                  </Text>
                  <Text className="font-virgil text-2xl">{player2.score}</Text>
                </View>
              ) : (
                <View>
                  <Text className="font-virgil text-gray-400 text-lg">
                    {player2.playerName}:
                  </Text>
                  <Text className="font-virgil text-gray-400 text-lg">
                    {player2.score}
                  </Text>
                </View>
              )}
            </View>

            <View className="m-4">
              <Text className="font-virgil text-2xl text-center">
                Round Score: {roundScore}
              </Text>
            </View>
          </View>
          <View className="grow">
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
          <View className="flex-none">
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
            <View className="flex-1 h-full w-full self-center justify-center items-center">
              <Pressable onPress={() => setFarkleAlertVis(false)}>
                <Image
                  source={farkleModal}
                  className="w-screen"
                  style={{ resizeMode: "contain" }}
                />
              </Pressable>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={endGameAlertVis}
          >
            <View className="flex-1 h-full w-full self-center justify-center items-center">
              <Image
                source={winnerModal}
                className="w-screen"
                style={{ resizeMode: "contain" }}
              />
            </View>

            <View className="flex-1 h-full absolute self-center justify-center mx-6 space-y-3">
              <View className="space-y-1">
                <Text className="font-virgil text-red-600 text-4xl scale-150 text-center skew-y-1 shadow-white">
                  {currentPlayer.playerName}
                </Text>
                <Text className="font-virgil text-red-600 text-4xl text-center">
                  is the
                </Text>
                <Text className="font-virgil text-red-600 text-7xl text-center -skew-y-3">
                  Winner!
                </Text>
              </View>

              <View className="space-y-4">
                <Pressable
                  onPress={() => {
                    handleEndGame();
                  }}
                >
                  <Text className="font-virgil text-green-600 text-4xl text-center">
                    Play again!
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                >
                  <Text className="font-virgil text-2xl text-center">
                    Take me Home.
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});

export default Game;
