import { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import GameLogicScreen from "./GamingLogic/GamingLogicScreen";
import ScoringScreen from "./Scoring/ScoringScreen";
import { dice } from "./Dice";
import { GameTypeContext } from "../../global/GameContext";

import background from "../../assets/background.png";
import farkleModal from "../../assets/modals/farkle-modal.png";
import winnerModal from "../../assets/modals/winner-modal2.png";
import modalButton from "../../assets/buttons/modalButton.png";

const Game = () => {
  const { player1, player2, currentPlayer } = useContext(GameTypeContext);

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

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView className="h-full flex-1 justify-between mr-5 ml-5">
        <View className="flex-1 flex-row justify-between m-2">
          <View>
            <Text className="font-virgil text-3xl">{player1.name}:</Text>
            <Text className="font-virgil text-3xl">{player1.score}</Text>
          </View>
          <View className="flex-1 top-16">
          <Text className="font-virgil text-3xl text-center">
            Round Score: {roundScore}
          </Text>
        </View>
          <View>
            <Text className="font-virgil text-3xl">{player2.name}:</Text>
            <Text className="font-virgil text-3xl">{player2.score}</Text>
          </View>
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
              <Pressable onPress={() => setEndGameAlertVis(false)}>
                <Image source={winnerModal} />
              </Pressable>
            </View>
          </Modal>

        {/* <View style={styles.modalButton}>
          <TouchableOpacity onPress={() => setEndGameAlertVis(true)}>
            <Image source={modalButton} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFarkleAlertVis(true)}>
            <Image source={modalButton} />
          </TouchableOpacity>
        </View> */}
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
