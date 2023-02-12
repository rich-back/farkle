import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, Modal, StyleSheet, Pressable } from "react-native";
import { GameTypeContext } from "../../../global/GameContext";
import { dice } from "../Dice";
import { countScore, endTurn } from "./ScoringLogic";

const ScoringScreen = ({
  counted,
  endable,
  keptDice,
  bankedDice,
  roundScore,
  turnCounter,
  setCounted,
  setLiveDice,
  setTurnCounter,
  setEndGameAlertVis,
  setRoundScore,
  setKeptDice,
  setBankedDice,
  setEndable,
  setDisabled,
  hasSelectedDice,
  setHasSelectedDice,
}) => {
  const [rollScore, setRollScore] = useState(0);
  const [rollAgainModal, setRollAgainModal] = useState(false);
  const {
    player1,
    player2,
    currentPlayer,
    setCurrentPlayer,
    setPlayer1,
    setPlayer2,
  } = useContext(GameTypeContext);
  const score = currentPlayer.score;

  useEffect(() => {
    completeGame();
  }, [score, roundScore]);

  useEffect(() => {
    if (bankedDice.length === 6) {
      setRollAgainModal(true);
    }
  }, [bankedDice]);

  useEffect(() => {
    // ! Added this logic to cope with 2 players
    if (currentPlayer.name === player1.name) {
      setCurrentPlayer(player2);
    } else {
      setCurrentPlayer(player1);
    }
  }, [turnCounter]);

  const completeGame = () => {
    if (roundScore >= currentPlayer.score) {
      setEndGameAlertVis(true);
      clickEndTurn();
    }
  };

  const clickCountScore = () => {
    if (!counted) {
      const newCountState = countScore({
        roundScore,
        rollScore,
        keptDice,
      });
      setRoundScore(newCountState.roundScore);
      setCounted(true);
      setRollScore(0);
      setDisabled(true);
      setHasSelectedDice(true);
      setEndable(true);
      setBankedDice(bankedDice.concat(keptDice));
      setKeptDice([]);
    }
  };

  const clickEndTurn = () => {
    if (endable == true) {
      const endTurnState = endTurn({ score, roundScore, turnCounter });
      if (currentPlayer.name === player1.name) {
        setPlayer1({ ...player1, score: endTurnState.score });
      } else {
        setPlayer2({ ...player2, score: endTurnState.score });
      }
      setTurnCounter(endTurnState.turnCounter);
      setRoundScore(0);
      setLiveDice(dice);
      setKeptDice([]);
      setBankedDice([]);
      setHasSelectedDice(true);
      setCounted(true);
      setEndable(false);
    }
  };

  const clickRollAgain = () => {
    setLiveDice(dice);
    setBankedDice([]);
    setDisabled(true);
  };

  return (
    <View>
      <Text></Text>
      {!hasSelectedDice ? (
        <Button title="count score" onPress={clickCountScore} />
      ) : null}
      <Text></Text>
      <Button title="end round" onPress={clickEndTurn} />
      <Text>Turn: {turnCounter}</Text>
      {/* //! Scoring logic player dependent */}
      <Text>Score: {currentPlayer.score}</Text>
      <Text>Round Score: {roundScore}</Text>

      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={rollAgainModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Would you like to Roll again?</Text>
            <Pressable
              onPress={() => {
                setRollAgainModal(false);
                clickRollAgain();
              }}
            >
              <Text style={styles.modalClose}>Roll again!</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setRollAgainModal(false);
                clickEndTurn();
              }}
            >
              <Text style={styles.modalClose}>End Turn</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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

export default ScoringScreen;
