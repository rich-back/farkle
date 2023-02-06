import { useState } from "react";
import { Button, Modal, Pressable, Text, View } from "react-native";
import GameLogic from "./GameLogic";
import ScoringLogic from "./ScoringLogic";

const Game = () => {
  const [liveDice, setLiveDice] = useState();
  const [keptDice, setKeptDice] = useState();
  const [counted, setCounted] = useState(false);
  const [turnCounter, setTurnCounter] = useState(1);
  const [farkleAlertVis, setFarkleAlertVis] = useState(false);
  const [dice, setDice] = useState([
    { key: "dice1", value: 1 },
    { key: "dice2", value: 2 },
    { key: "dice3", value: 3 },
    { key: "dice4", value: 4 },
    { key: "dice5", value: 5 },
    { key: "dice6", value: 6 },
  ]);

  const keepDi = () => {
    setKeptDice();
  };

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
      <GameLogic
        counted={counted}
        dice={dice}
        keepDi={keepDi}
        keptDice={keptDice}
        liveDice={liveDice}
        setCounted={setCounted}
        setDice={setDice}
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
      />
    </View>
  );
};
export default Game;
