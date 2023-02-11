import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { GameTypeContext } from "../../global/GameContext";

const Home = ({ navigation }) => {
  const { typeOfGame, setTypeOfGame } = useContext(GameTypeContext);

  return (
    <View style={styles.container}>
      {/*  // * changing single option to one or two player */}
      {/* <Button
        title="Play Farkle!"
        onPress={() => navigation.navigate('Game')}
      /> */}
      <Button
        title="Play single player!"
        onPress={() => {
          navigation.navigate("Game");
          setTypeOfGame("single");
        }}
        r
      />
      <Button
        title="Play two player!"
        onPress={() => {
          navigation.navigate("Game");
          setTypeOfGame("two");
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
