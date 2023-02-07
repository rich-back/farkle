import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import scoringRules from '../../assets/farkle-scoresheet.png'

const Instructions = () => {
  return (
    <View style={styles.container}>
      <Text>This is where the Instructions go...</Text>
      <Image source={scoringRules} style={{maxWidth: 400, maxHeight: 400}}/>
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

export default Instructions

