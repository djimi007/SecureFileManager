import { View } from "react-native";
import { AnimatedText } from "../utils/animationsCompnent";
import { FolderIcon, pages } from "../utils/pagesUtils";

const FolderComponent = () => (
  <View>
    <FolderIcon style={{ height: "70%", width: "80%" }} />
    <AnimatedText>{pages[0].title}</AnimatedText>
    <AnimatedText>{pages[0].content}</AnimatedText>
  </View>
);

export default FolderComponent;
