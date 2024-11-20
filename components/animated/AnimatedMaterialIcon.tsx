import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

import { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import { hp, wp } from "../../utils/dimonsions";

interface Props {
  photoSelected: boolean;
  recording: boolean;
  takePhoto: () => Promise<void>;
  toggleRecording: () => void;
}

export default memo(function AnimatedMaterialIconComponent({
  photoSelected,
  recording,
  takePhoto,
  toggleRecording,
}: Props) {
  const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

  const backgroundColor = useSharedValue("black");

  useEffect(() => {
    photoSelected
      ? (backgroundColor.value = withTiming("black"))
      : (backgroundColor.value = withTiming("red"));
  }, [photoSelected]);

  return (
    <AnimatedMaterialIcon
      // entering={ZoomIn.springify().damping(60).mass(2).stiffness(30).restSpeedThreshold(1)}
      name={photoSelected ? "camera" : recording ? "stop" : "camera"}
      size={wp(18)}
      color="white"
      style={[
        styles.icon,
        {
          backgroundColor,
        },
      ]}
      onPress={photoSelected ? takePhoto : toggleRecording}
    />
  );
});

const styles = StyleSheet.create({
  icon: {
    zIndex: 99999,
    borderRadius: 8888,
    bottom: hp(3.5),
    position: "absolute",
    alignSelf: "center",
  },
});
