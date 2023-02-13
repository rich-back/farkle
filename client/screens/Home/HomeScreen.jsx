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
} from "react-native";
import { GameTypeContext } from "../../global/GameContext";
import { Player } from "../Game/Player";

import background from "../../assets/paper-background.jpeg";
import splashlogo from "../../assets/SplashModal.png";
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
  const [singleModal, setSingleModal] = useState(false);
  const [doubleModal, setDoubleModal] = useState(false);

  const handleSingleClick = () => {
    setSingleModal(true);
  };

  const handleDoubleClick = () => {
    setDoubleModal(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <Modal visible={doubleModal}>
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
                setDoubleModal(false);
                setCurrentPlayer(player1);
              }}
            />
          </View>
        </Modal>

        <View style={styles.buttonContainer}>

        {/* <Image source={splashlogo} style={styles.logo}/> */}

          <TouchableOpacity 
            onPress={() => {
              setTypeOfGame("two");
              handleDoubleClick();
              }}>
            <Image source={playButton} style={styles.button} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Instructions")}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 400,
    maxHeight: 200
  },
  button: {
    alignItems: "center",
    // width: '20%',
    // maxHeight: '20%'
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
