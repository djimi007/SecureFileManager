import { View } from "react-native";
import { MicIcon, pages } from "../utils/pagesUtils";
import { AnimatedText } from "../utils/animationsCompnent";

const MicComponent = () => (
  <View>
    <MicIcon style={{ height: "70%", width: "80%" }} />
    <AnimatedText>{pages[0].title}</AnimatedText>
    <AnimatedText>{pages[0].content}</AnimatedText>
  </View>
);

export default MicComponent;
