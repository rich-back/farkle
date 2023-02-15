import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import Virgil from "./assets/fonts/Virgil.ttf";
import start from "./assets/sounds/pencil.wav";
import { GameTypeProvider } from "./global/GameContext";
import Game from "./screens/Game/GameScreen";
import Home from "./screens/Home/HomeScreen";
import Instructions from "./screens/Instructions/Instructions";
import LeaderBoard from "./screens/LeaderBoard/LeaderBoard";
import homeButton from "./assets/images/homeButton.png";
import { Button, Image, TouchableOpacity } from "react-native";
import BackButton from "./components/BackButton";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Virgil: Virgil,
  });

  const [sound, setSound] = useState();

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
    const prepare = async () => {
      playSound(start);
      // keep splash screen visible
      await SplashScreen.preventAutoHideAsync();

      // pre-load your stuff
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // hide splash screen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return !fontsLoaded ? null : (
    <GameTypeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerBackTitleVisible: false,
            headerTitleStyle: {fontFamily: "Virgil", fontSize: 30}
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            options={({ navigation }) => ({
              headerLeft: () => <BackButton />,
            })}
          />
          <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
          <Stack.Screen name="Instructions" component={Instructions} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameTypeProvider>
  );
}
