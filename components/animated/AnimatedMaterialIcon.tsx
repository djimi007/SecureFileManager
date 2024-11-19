import { MaterialIcons } from "@expo/vector-icons";
import Animated, { interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from "react-native-reanimated";

import { StyleSheet } from "react-native";
import { hp, wp } from "../../utils/dimonsions";
import { memo } from "react";

interface Props  {

    photoSelected : boolean 
    recording : boolean 
    takePhoto : () => Promise<void>
    takeVideo : ()=> void
}

const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

export default memo(function AnimatedMaterialIconComponent ({ photoSelected, recording, takePhoto, takeVideo
} :Props) {

  const sv = useSharedValue("black");

  console.log(photoSelected);
  
  const animatedStyle = useAnimatedStyle(() => {
      return {
          backgroundColor: photoSelected ? sv.value = "black": sv.value = "red"
        };
    });
    
    return (
        <AnimatedMaterialIcon
            // entering={ZoomIn.springify().damping(60).mass(2).stiffness(30).restSpeedThreshold(1)}
            name={photoSelected ? "camera" : recording ? "stop" : "camera"}
            size={wp(18)}
            color="white"
            style={[styles.icon, animatedStyle]}
            onPress={photoSelected ? takePhoto : takeVideo}
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
})