import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

import img1 from "../../assets/images/Screenshot1.png";
import img2 from "../../assets/images/Screenshot2.png";
import img3 from "../../assets/images/Screenshot3.png";
import img4 from "../../assets/images/Screenshot4.png";

const Instructions = () => {
  const images = [img1, img2, img3, img4];

  const [index, setIndex] = useState(0);

  return (
    <View className="flex-1 justify-center self-center gap-6">
      <Image source={images[index]} style={{ maxWidth: 400, maxHeight: 800 }} />
      <View className="flex-row justify-between">
        {index > 0 ? (
          <View>
            <Text
              className="font-virgil text-3xl"
              onPress={() => {
                setIndex(index - 1);
              }}
            >
              Prev
            </Text>
          </View>
        ) : (
          <View>
            <Text
              className="font-virgil text-3xl"
              onPress={() => {
                null;
              }}
            >
              Prev
            </Text>
          </View>
        )}

        <View>
          <Text className="font-virgil text-3xl">{index + 1}/4</Text>
        </View>

        {index < 3 ? (
          <View>
            <Text
              className="font-virgil text-3xl"
              onPress={() => {
                setIndex(index + 1);
              }}
            >
              Next
            </Text>
          </View>
        ) : (
          <View>
            <Text
              className="font-virgil text-3xl"
              onPress={() => {
                null;
              }}
            >
              Next
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Instructions;
