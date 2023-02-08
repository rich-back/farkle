import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>This is the Home Screen</Text>
      <Button
        title="Play Farkle!"
        onPress={() => navigation.navigate('Game')}
      />
      <Button
        title="How to play Farkle"
        onPress={() => navigation.navigate('Instructions')}
      />
      <Button
        title="LeaderBoard"
        onPress={() => navigation.navigate('LeaderBoard')}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        
    },
});

export default Home