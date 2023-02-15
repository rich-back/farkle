import { Image, TouchableOpacity } from "react-native";
import homeImage from "../assets/images/homeButton.png";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={homeImage} />
    </TouchableOpacity>
  );
};
export default BackButton;
