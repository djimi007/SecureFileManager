import { View } from "react-native";
import { AnimatedText } from "../../utils/animation/animationsCompnent";
import { FolderIcon, pages } from "../../utils/pages&svgUtils";
import { styles } from "../../constants/styles";
import Animated, {
  Easing,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import React from "react";

const FolderComponent = () => {
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
        <FolderIcon style={styles.icons} />
      </Animated.View>

      <AnimatedText entering={FadeInLeft.delay(500)} style={styles.title}>
        {pages[1].title}
      </AnimatedText>
      <AnimatedText entering={FadeInLeft.delay(1000)} style={styles.description}>
        {pages[1].content}
      </AnimatedText>
    </View>
  );
};

export default FolderComponent;
