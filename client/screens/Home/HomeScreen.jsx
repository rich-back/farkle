import { Video } from "expo-av";
import React, { useContext, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import playButton from "../../assets/buttons/home-play-button.png";
import rulesButton from "../../assets/buttons/rules-button.png";
import diceMovie from "../../assets/diceMovie.mp4";
import postItL from "../../assets/modals/post-it-L.png";
import { GameTypeContext } from "../../global/GameContext";
import { Player } from "../Game/Player";

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

  const handleLetsPlay = () => {
    if (!player1 || !player2) {
      alert("Please Enter Names");
      return;
    } else {
      navigation.navigate("Game");
      setGameModal(false);
      setCurrentPlayer(player2);
    }
  };

  return (
    <View className="h-full align-middle items-center justify-center flex-1">
      <Video
        className="absolute self-center w-full h-full"
        source={diceMovie}
        resizeMode="cover"
        isLooping
        shouldPlay={true}
      />
      <TouchableOpacity
        onPress={() => {
          setTypeOfGame("two");
          handleDoubleClick();
        }}
      >
        <Image source={playButton} className="items-center m-5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Instructions")}>
        <Image source={rulesButton} className="items-center m-5" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={gameModal}
      >
        <View className="flex-1 h-full absolute self-center justify-center align-middle ">
          <Image source={postItL} className="" />
        </View>
        <View className="flex-1 h-full absolute self-center justify-center align-middle font-virgil ">
          <Text className="font-virgil text-2xl text-center">
            What's your name pal?
          </Text>
          <TextInput
            className="font-virgil text-3xl text-center"
            autoFocus={true}
            cursorColor={`#000000`}
            onChangeText={(text) => setPlayer1(new Player(text))}
          />
          <Text className="font-virgil text-2xl text-center">
            ... and the other mug?
          </Text>
          <TextInput
            className="font-virgil text-3xl text-center"
            onChangeText={(text) => setPlayer2(new Player(text))}
          />
          <Pressable title="Let's play!" onPress={handleLetsPlay}>
            <Text className="font-virgil text-3xl text-center">
              Let's play!
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   background: {
//     width: "100%",
//     height: "100%",
//   },
//   button: {
//     alignItems: "center",
//     margin: 20,
//   },
//   buttonContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   video: {
//     position: "absolute",
//     alignSelf: "center",
//     width: "103%",
//     height: "103%",
//     top: -11,
//   },
// });

export default Home;
