import React from "react";
import { View, Text } from "react-native";
import { CameraIcon, pages } from "../../utils/pages&svgUtils";
import { AnimatedText } from "../../utils/animation/animationsCompnent";
import { styles } from "../../constants/styles";
import Animated, {
  Easing,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const CameraComponent = () => {
  const duration = 2000;
  const easing = Easing.bezier(0.25, 0.5, 0.25, 1);

  const sv = useSharedValue(0);
  React.useEffect(() => {
    sv.value = withTiming(1, { duration, easing });
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));
  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <CameraIcon style={[styles.icons]} />
      </Animated.View>
      <AnimatedText entering={FadeInLeft.delay(500)} style={styles.title}>
        {pages[2].title}
      </AnimatedText>
      <AnimatedText entering={FadeInLeft.delay(1000)} style={styles.description}>
        {pages[2].content}
      </AnimatedText>
    </View>
  );
};

export default CameraComponent;
