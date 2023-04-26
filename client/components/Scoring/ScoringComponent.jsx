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
import { GameTypeContext } from "../../global/GameContext";
import { dice } from "../Dice";
import { countScore, endTurn } from "./ScoringLogic";
import scoreButton from "../../assets/buttons/count-score-button.png";
import endTurnButton from "../../assets/buttons/end-turn-button.png";
import rulesToggle from "../../assets/buttons/scoreRulesToggle.png";
import rollAgain from "../../assets/modals/roll-again-modal.png";
import CustomButton from "../Button";
import typingSound from "../../assets/sounds/CashRegister.mp3";
import win from "../../assets/sounds/TaDasound.mp3";
import bank from "../../assets/sounds/typing.wav";
import scoringModal from "../../assets/images/farkle-scoresheet.png";
import RulesButton from "../RulesButton";

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
      playSound(win);
      setEndGameAlertVis(true);
      // clickEndTurn(); // * This cancels out winner sound effect
      setRoundScore(0);
      setLiveDice(dice);
      setKeptDice([]);
      setBankedDice([]);
      setHasSelectedDice(true);
      setCounted(true);
      setEndable(false);
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
    <>
      <View className="flex-row justify-between items-center mb-2">
        <View>
          <CustomButton imageSource={endTurnButton} onPress={clickEndTurn} />
        </View>

        <View>
          <RulesButton
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
      </View>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={scoreRulesModal}
      >
        <View className="self-center">
          <Pressable
            onPress={() => {
              setScoreRulesModal(false);
            }}
          >
            <Image
              className="flex-1 w-screen scale-90"
              style={{
                resizeMode: "contain",
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
        <View className="flex-1 h-full w-full self-center justify-center items-center">
          <Image
            source={rollAgain}
            className="w-screen"
            style={{ resizeMode: "contain" }}
          />
        </View>

        <View className="flex-1 h-full absolute self-center justify-center mx-6 space-y-9">
          <View className="space-y-2">
            <Text className="font-virgil text-2xl text-center">
              Nice one {currentPlayer.playerName}!
            </Text>
            <Text className="font-virgil text-2xl text-center">
              You scored with all 6 dice!
            </Text>
            <Text className="font-virgil text-2xl text-center">
              Would you like to...
            </Text>
          </View>

          <View className="space-y-7">
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
        </View>
      </Modal>
    </>
  );
};

export default ScoringScreen;
