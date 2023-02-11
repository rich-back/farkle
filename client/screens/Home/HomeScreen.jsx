import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View, Modal, Text } from "react-native";
import { GameTypeContext } from "../../global/GameContext";

const Home = ({ navigation }) => {
  const { typeOfGame, setTypeOfGame } = useContext(GameTypeContext);
  const [singleModal, setSingleModal] = useState(false);
  const [doubleModal, setDoubleModal] = useState(false);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const handleSingleClick = () => {
    setSingleModal(true);
  };

  const handleDoubleClick = () => {
    setDoubleModal(true);
  };

  return (
    <View style={styles.container}>
      <Modal visible={singleModal}>
        <View style={styles.container}>
          <Text>Name: </Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="What's your name pal?"
            onChangeText={(text) => setPlayer1Name(text)}
          />
          <Button
            title="Let's play"
            onPress={() => {
              navigation.navigate("Game");
              setSingleModal(false);
            }}
          />
        </View>
      </Modal>
      <Modal visible={doubleModal}>
        <TextInput />
      </Modal>
      {/*  // * changing single option to one or two player */}
      {/* <Button
        title="Play Farkle!"
        onPress={() => navigation.navigate('Game')}
      /> */}
      <Button
        title="Play single player!"
        onPress={() => {
          // navigation.navigate("Game");
          setTypeOfGame("single");
          handleSingleClick();
        }}
        r
      />
      <Button
        title="Play two player!"
        onPress={() => {
          // navigation.navigate("Game");
          setTypeOfGame("two");
          handleDoubleClick();
        }}
      />
      <Button
        title="How to play Farkle"
        onPress={() => navigation.navigate("Instructions")}
      />
      <Button
        title="LeaderBoard"
        onPress={() => navigation.navigate("LeaderBoard")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
