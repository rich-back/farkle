import { SafeAreaView, Text, View, Image } from "react-native";
import React, { useState } from "react";

import img1 from "../../assets/images/Screenshot1.png";
import img2 from "../../assets/images/Screenshot2.png";
import img3 from "../../assets/images/Screenshot3.png";
import img4 from "../../assets/images/Screenshot4.png";
import { styled } from "nativewind";

const StyledView = styled(View)
const StyledImage = styled(Image)

const Instructions = () => {
  const images = [img1, img2, img3, img4];

  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView className="flex-1 h-screen justify-center self-center m-6">

      <StyledView className="flex container w-screen">
        <StyledImage source={images[index]} className="object-contain w-screen h-full" style={{resizeMode: 'contain'}}/>
      </StyledView>

      <View className="flex mx-4 my-2">
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
    </SafeAreaView>
  );
};

export default Instructions;
