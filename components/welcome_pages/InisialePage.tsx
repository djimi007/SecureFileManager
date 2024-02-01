import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import { AnimatedText } from "../../utils/animation/animationsCompnent";
import { FadeInDown, FadeInUp } from "react-native-reanimated";
import { hp, wp } from "../../utils/dimonsions";
import { pages } from "../../utils/pages&svgUtils";

const InitialePage = () => (
  <View style={{ alignItems: "center" }}>
    <LottieView
      autoPlay
      source={require("@/anim/animation.json")}
      style={{ height: hp(50), width: wp(80) }}
    />
    <AnimatedText
      entering={FadeInDown.delay(300)}
      style={styles.textTitle}
    >
      {pages[0].title}
    </AnimatedText>
    <AnimatedText
      entering={FadeInUp.delay(1000)}
      style={styles.description}
    >
      {pages[0].content}
    </AnimatedText>
  </View>
);

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "SpaceMono",
    fontSize: wp(6),
    color: "white",
  },
  description: { marginTop: "10%", color: "white", fontSize: wp(3) },
});

export default InitialePage;
