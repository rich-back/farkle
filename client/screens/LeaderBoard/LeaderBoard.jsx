import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LeaderBoard = () => {
  return (
    <View style={styles.container}>
      <Text>This is where the LeaderBoard goes...</Text>
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

export default LeaderBoard

