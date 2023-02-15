import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GameTypeContext } from "../../../global/GameContext";
import { dice } from "../Dice";
import { countScore, endTurn } from "./ScoringLogic";
import scoreButton from "../../../assets/buttons/count-score-button.png";
import endTurnButton from "../../../assets/buttons/end-turn-button.png";
import rulesToggle from "../../../assets/buttons/scoreRulesToggle.png";
import rollAgain from "../../../assets/modals/roll-again-modal.png";
import CustomButton from "../../../components/Button";
import typingSound from "../../../assets/sounds/CashRegister.mp3";
import win from "../../../assets/sounds/TaDasound.mp3";
import bank from "../../../assets/sounds/typing.wav";
import scoringModal from "../../../assets/images/farkle-scoresheet.png";

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
  playSound,
}) => {
  const [rollScore, setRollScore] = useState(0);
  const [rollAgainModal, setRollAgainModal] = useState(false);
  const [scoreRulesModal, setScoreRulesModal] = useState(false);
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
    if (currentPlayer.playerName === player1.playerName) {
      setCurrentPlayer(player2);
    } else {
      setCurrentPlayer(player1);
    }
  }, [turnCounter]);

  const completeGame = () => {
    if (roundScore >= currentPlayer.score) {
      setEndGameAlertVis(true);
      // clickEndTurn(); // * This cancels out winner sound effect
      setRoundScore(0);
      setLiveDice(dice);
      setKeptDice([]);
      setBankedDice([]);
      setHasSelectedDice(true);
      setCounted(true);
      setEndable(false);
      playSound(win);
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
      playSound(typingSound);
    }
  };

  const clickEndTurn = () => {
    if (endable == true) {
      const endTurnState = endTurn({ score, roundScore, turnCounter });
      if (currentPlayer.playerName === player1.playerName) {
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
      playSound(bank);
    }
  };

  const clickRollAgain = () => {
    setLiveDice(dice);
    setBankedDice([]);
    setDisabled(true);
  };

  const clickScoreRulesButton = () => {
    setScoreRulesModal(true);
  };

  return (
    <View className="flex-1 flex-row justify-between">
      <View>
        <CustomButton imageSource={endTurnButton} onPress={clickEndTurn} />
      </View>

      <View>
        <CustomButton
          imageSource={rulesToggle}
          onPress={clickScoreRulesButton}
        />
      </View>

      {!hasSelectedDice ? (
        <View>
          <CustomButton imageSource={scoreButton} onPress={clickCountScore} />
        </View>
      ) : (
        <View>
          <CustomButton imageSource={scoreButton} onPress={null} />
        </View>
      )}

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={scoreRulesModal}
      >
        <View className="absolute self-center mt-48 ">
          <Pressable
            onPress={() => {
              setScoreRulesModal(false);
            }}
          >
            <Image
              style={{
                flex: 1,
                height: 500,
                resizeMode: "contain",
                width: 450,
              }}
              source={scoringModal}
            />
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={rollAgainModal}
      >
        <View className="flex-1 h-full absolute self-center justify-center align-middle">
          <Image source={rollAgain} />
        </View>

        <View className="flex-1 h-full absolute self-center justify-center align-middle font-virgil gap-7 pr-4">
          <Text className="font-virgil text-3xl text-center">
            Would you like to roll again?
          </Text>
          <Pressable
            onPress={() => {
              setRollAgainModal(false);
              clickRollAgain();
            }}
          >
            <Text className="font-virgil text-3xl text-center">
              Roll again!
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setRollAgainModal(false);
              clickEndTurn();
            }}
          >
            <Text className="font-virgil text-3xl text-center">End Turn</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    marginBottom: 400,
  },
  modalText: {
    color: "red",
  },
  modalClose: {
    color: "white",
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  modalImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  modalImage: {
    position: "absolute",
  },
});

export default ScoringScreen;
