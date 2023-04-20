import { Image, TouchableOpacity } from "react-native";

const RulesButton = ({ imageSource, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Image className="w-[60px] h-[70px] mt-2" source={imageSource} />
      </TouchableOpacity>
  );
};
export default RulesButton;