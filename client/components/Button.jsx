import BGB from "../assets/buttons/blank-button-grey.png";
import { View, Image, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ imageSource, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Image source={imageSource} />
      </TouchableOpacity>
  );
};
export default CustomButton;
