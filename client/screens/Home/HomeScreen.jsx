import { Video } from "expo-av";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import playButton from "../../assets/buttons/home-play-button.png";
import { Audio } from "expo-av";
import rulesButton from "../../assets/buttons/rules-button.png";
import postItL from "../../assets/modals/post-it-blankL.png";
import diceMovie from "../../assets/movies/diceMovie.mp4";
import { GameTypeContext } from "../../global/GameContext";
import { Player } from "../../components/Player";
import crashSound from "../../assets/sounds/CrashCymbal.wav";
import { Slider } from "@miblanchard/react-native-slider";

import { styled } from 'nativewind';
const StyledView = styled(View)
const StyledImage = styled(Image)


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

  const [sound, setSound] = useState();
  const [sliderValue, setSliderValue] = useState(2000);

  const playSound = useCallback(async (soundItem) => {
    const { sound } = await Audio.Sound.createAsync(soundItem);
    setSound(sound);
    await sound.playAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    setPlayer1(new Player(""));
    setPlayer2(new Player(""));
  }, []);

  const handleDoubleClick = () => {
    setGameModal(true);
  };

  const handleLetsPlay = () => {
    if (player1.playerName.length < 1 || player2.playerName.length < 1) {
      alert("Please Enter Names");
      return;
    } else {
      setPlayer1({ ...player1, score: sliderValue })
      setPlayer2({ ...player2, score: sliderValue })
      navigation.navigate("Game");
      setGameModal(false);
      setCurrentPlayer(player2);
      playSound(crashSound);
    }
  };

  return (
    <View className="h-full align-middle items-center justify-center flex-1">
      <Video
        className="absolute self-center w-full h-full"
        source={diceMovie}
        resizeMode="cover"
        isLooping={true}
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
        <StyledView className="container flex-1 w-[90vw] h-full self-center justify-center items-center">
          <StyledImage source={postItL} className="w-[375px] h-[375px]"/>
        </StyledView>

        <View className="flex-1 h-full absolute self-center justify-center align-middle font-virgil">
          <Text className="font-virgil text-2xl text-center pb-2">
            What's your name pal?
          </Text>
          <TextInput
            className="font-virgil text-xl text-center"
            autoFocus={true}
            cursorColor={`#000000`}
            placeholder="player 1... "
            placeholderTextColor={"grey"}
            onChangeText={(text) =>
              setPlayer1({ ...player1, playerName: text })
            }
          />
          <Text className="font-virgil text-2xl text-center pb-2">
            ... and your rival?
          </Text>
          <TextInput
            className="font-virgil text-xl text-center pb-6"
            placeholder="player 2... "
            placeholderTextColor={"grey"}
            onChangeText={(text) =>
              setPlayer2({ ...player2, playerName: text })
            }
          />
          <View>
            <Text className="font-virgil text-xl text-center" >Play to score: {sliderValue}</Text>
            <Slider
            value={sliderValue} 
            onValueChange={value => setSliderValue(value)} 
            minimumValue={1000} 
            maximumValue={10000} 
            step={1000} 
            trackClickable={true} />
          </View>
          <Pressable onPress={handleLetsPlay}>
            <Text className="font-virgil text-3xl text-center pt-2">
              Let's play!
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
