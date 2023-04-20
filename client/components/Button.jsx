import { Image, TouchableOpacity } from "react-native";

const CustomButton = ({ imageSource, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Image className="w-[120px] h-[70px]" source={imageSource} />
      </TouchableOpacity>
  );
};
export default CustomButton;
