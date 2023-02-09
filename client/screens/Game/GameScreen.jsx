import { useEffect, useState } from "react";
import { Button, Modal, Pressable, Text, View, StyleSheet } from "react-native";
import GameLogicScreen from "./GamingLogic/GamingLogicScreen";
import ScoringScreen from "./Scoring/ScoringScreen";
import {dice} from "./Dice";

const Game = () => {
  const [liveDice, setLiveDice] = useState();
  const [keptDice, setKeptDice] = useState([]);
  const [counted, setCounted] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [turnCounter, setTurnCounter] = useState(1);
  const [farkleAlertVis, setFarkleAlertVis] = useState(false);
  const [endGameAlertVis, setEndGameAlertVis] = useState(false);

  useEffect(() => {
    setLiveDice(dice);
  }, []);

  const keepDi = () => {
    setKeptDice();
  };

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          presentationStyle="overFullScreen"
          transparent={true}
          visible={farkleAlertVis}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Farkle!!</Text>
              <Pressable onPress={() => setFarkleAlertVis(false)}>
                <Text style={styles.modalClose}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          presentationStyle="overFullScreen"
          transparent={true}
          visible={endGameAlertVis}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Winner!</Text>
              <Pressable onPress={() => setEndGameAlertVis(false)}>
                <Text style={styles.modalClose}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <GameLogicScreen
        counted={counted}
        keptDice={keptDice}
        liveDice={liveDice}
        roundScore={roundScore}
        setCounted={setCounted}
        setFarkleAlertVis={setFarkleAlertVis}
        setKeptDice={setKeptDice}
        setLiveDice={setLiveDice}
        setRoundScore={setRoundScore}
      />
      <ScoringScreen
        counted={counted}
        keptDice={keptDice}
        liveDice={liveDice}
        roundScore={roundScore}
        turnCounter={turnCounter}
        setCounted={setCounted}
        setEndGameAlertVis={setEndGameAlertVis}
        setKeptDice={setKeptDice}
        setLiveDice={setLiveDice}
        setRoundScore={setRoundScore}
        setTurnCounter={setTurnCounter}
      />

      <Button
        title="Test EndGame Modal"
        onPress={() => setEndGameAlertVis(true)}
      />
      <Text></Text>
      <Button
        title="Test Farkle Modal"
        onPress={() => setFarkleAlertVis(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    marginBottom: 250,
    backgroundColor: "white",
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
  modalText: {
    fontSize: 80,
    color: "red",
    position: "absolute",
  },
  modalClose: {
    marginTop: 300,
    color: "white",
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 10,
  },
});

export default Game;
