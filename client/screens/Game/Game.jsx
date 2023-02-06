import { useEffect, useState } from "react";
import { Button, Modal, Pressable, Text, View } from "react-native";
import GameLogic from "./GameLogic";
import ScoringLogic from "./ScoringLogic";

const Game = () => {
  const [liveDice, setLiveDice] = useState();
  const [keptDice, setKeptDice] = useState();
  const [counted, setCounted] = useState(false);
  const [turnCounter, setTurnCounter] = useState(1);
  const [farkleAlertVis, setFarkleAlertVis] = useState(false);
  const [endGameAlertVis, setEndGameAlertVis] = useState(false);
  const [dice, setDice] = useState([
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ]);

  useEffect(() => {
    setLiveDice(dice);
  }, []);

  return (
    <View>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={farkleAlertVis}
      >
        <View>
          <Text>Farkle</Text>
          <Pressable onPress={() => setFarkleAlertVis(false)}>
            <Text>Close modal</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={endGameAlertVis}
      >
        <View>
          <Text>Winner!</Text>
          <Pressable onPress={() => setEndGameAlertVis(false)}>
            <Text>Close modal</Text>
          </Pressable>
        </View>
      </Modal>
      <GameLogic
        counted={counted}
        dice={dice}
        keptDice={keptDice}
        liveDice={liveDice}
        setCounted={setCounted}
        setDice={setDice}
        setLiveDice={setLiveDice}
        setKeptDice={setKeptDice}
        setFarkleAlertVis={setFarkleAlertVis}
      />
      <ScoringLogic
        counted={counted}
        dice={dice}
        keptDice={keptDice}
        liveDice={liveDice}
        turnCounter={turnCounter}
        setCounted={setCounted}
        setDice={setDice}
        setKeptDice={setKeptDice}
        setLiveDice={setLiveDice}
        setTurnCounter={setTurnCounter}
        setEndGameAlertVis={setEndGameAlertVis}
      />
    </View>
  );
};
export default Game;
