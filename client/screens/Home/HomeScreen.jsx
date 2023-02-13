import React, { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Modal,
  Text,
  ImageBackground,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { GameTypeContext } from "../../global/GameContext";
import { Player } from "../Game/Player";

import { Video } from "expo-av";
import diceMovie from "../../assets/diceMovie.mp4";

import background from "../../assets/paper-background.jpeg";
import playButton from "../../assets/buttons/home-play-button.png";
import rulesButton from "../../assets/buttons/rules-button.png";

const Home = ({ navigation }) => {
  const {
    setTypeOfGame,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    setCurrentPlayer,
  } = useContext(GameTypeContext);
  const [gameModal, setGameModal] = useState(false);

  const handleDoubleClick = () => {
    setGameModal(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <Video
          style={styles.video}
          source={diceMovie}
          resizeMode="cover"
          isLooping
          shouldPlay={true}
        />
        <Modal
          presentationStyle="overFullScreen"
          transparent={false}
          visible={gameModal}
        >
          <View style={styles.container}>
            <TextInput
              style={{ height: 40 }}
              placeholder="What's your name pal?"
              onChangeText={(text) => setPlayer1(new Player(text))}
            />
            <TextInput
              style={{ height: 40 }}
              placeholder="..and the other mug?"
              onChangeText={(text) => setPlayer2(new Player(text))}
            />
            <Button
              title="Let's play"
              onPress={() => {
                navigation.navigate("Game");
                setGameModal(false);
                setCurrentPlayer(player2);
              }}
            />
          </View>
        </Modal>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setTypeOfGame("two");
                handleDoubleClick();
              }}
            >
              <Image source={playButton} style={styles.button} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Instructions")}
            >
              <Image source={rulesButton} style={styles.button} />
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    position: 'absolute',
    alignSelf: "center",
    width: '103%',
    height: '103%',
    top: -11,
  },
});

export default Home;
