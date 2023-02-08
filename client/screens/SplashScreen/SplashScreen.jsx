import splashVideo from "../../assets/hd1722.mov";

import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, Modal } from "react-native";
import { Video } from "expo-av";

import logo from "../../assets/logo.png";

export default function SplashScreen({ navigation }) {
  const [logoModal, setLogoModal] = useState(false);

  setTimeout(() => {
    navigation.replace("Home");
  }, 6000);

  setTimeout(() => {
    setLogoModal(true);
  }, 1500);
  
  setTimeout(() => {
    setLogoModal(false);
  }, 5000);

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={splashVideo}
        resizeMode="cover"
        isLooping
        shouldPlay={true}
      />

      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        r
        transparent={true}
        visible={logoModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={logo} style={{ maxWidth: 300, maxHeight: 150 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    marginBottom: 550,
    backgroundColor: "white",
    width: 350,
    height: 200,
    borderRadius: 15,
    opacity: 70,
  },
});
