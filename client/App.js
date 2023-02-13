import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Game from "./screens/Game/GameScreen";
import Home from "./screens/Home/HomeScreen";
import SignIn from "./screens/signIn/SignIn";
import SignUp from "./screens/signUp/SignUp";
import LeaderBoard from "./screens/LeaderBoard/LeaderBoard";
import Instructions from "./screens/Instructions/Instructions";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import { GameTypeContext, GameTypeProvider } from "./global/GameContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameTypeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
          <Stack.Screen name="Instructions" component={Instructions} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameTypeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
