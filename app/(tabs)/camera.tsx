import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  CameraMode,
  CameraRecordingOptions,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFileFetch } from "../../AppState/fetchFiles";
import { usePath } from "../../AppState/pathstate";
import { hp, wp } from "../../utils/dimonsions";
import {
  interpolateColor,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomInRotate,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

export default function CameraPage() {
  const [flash, setFlash] = useState<FlashMode>("off");

  const [photoSelected, setPhotoSelected] = useState(true);
  const [postition, setPosition] = useState<CameraType>("back");
  const { path } = usePath();

  const { createImageFile } = useFileFetch();

  const cameraRef = useRef<CameraView>(null);

  const [recording, setRecording] = useState<boolean>(false);

  const photoSelectedExp = photoSelected ? "black" : "white";
  const videoSelectedExp = !photoSelected ? "black" : "white";

  const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(sv.value, [0, 1], ["#020202", "#F60808"], "RGB", {
        gamma: 0.1,
      }),
    };
  });

  const takePhoto = async () => {
    const photo = await cameraRef?.current?.takePictureAsync({
      quality: 1,
    });

    createImageFile(path, photo);
  };

  const onPressFlash = () => {
    if (flash === "off") setFlash("on");
    else setFlash("off");
  };

  const onPressPicture = () => {
    sv.value = withTiming(0);
    // Animate to 0
    setRecording(false);
    setPhotoSelected(true);
  };

  const onPressVideo = () => {
    sv.value = withTiming(1); // Animate to 1
    setPhotoSelected(false);
  };

  const startRecording = async () => {
    setRecording(true);
    const result = await cameraRef.current?.recordAsync();
    console.log("====================================");
    console.log(result);
    console.log("tesr");

    console.log("====================================");
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();

    setRecording(false);
  };

  const takeVideo = () => {
    setRecording(!recording);
    if (recording) stopRecording();
    else startRecording();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        mode={photoSelected ? "picture" : "video"}
        flash={flash}
      />

      <Ionicons
        name={flash === "off" ? "flash-off" : "flash"}
        size={wp(7)}
        color="white"
        style={{ position: "absolute", right: wp(3), top: hp(3) }}
        onPress={onPressFlash}
      />
      <MaterialIcons
        name="flip-camera-android"
        size={wp(7)}
        color="white"
        style={{ position: "absolute", right: wp(3), top: hp(9) }}
      />
      <View style={styles.tabTow}>
        <CustomPressable
          backGroundColor={!photoSelected ? "white" : "black"}
          textColor={!photoSelected ? "black" : "white"}
          text={"Photo"}
          onPress={onPressPicture}
        />
        <CustomPressable
          backGroundColor={photoSelected ? "white" : "black"}
          textColor={photoSelected ? "black" : "white"}
          text={"Video"}
          onPress={onPressVideo}
        />
      </View>

      <AnimatedMaterialIcon
        entering={ZoomIn.springify().damping(60).mass(2).stiffness(30).restSpeedThreshold(1)}
        name={photoSelected ? "camera" : recording ? "stop" : "camera"}
        size={wp(18)}
        color="white"
        style={[styles.icon, animatedStyle]}
        onPress={photoSelected ? takePhoto : takeVideo}
      />
    </SafeAreaView>
  );
}

const CustomPressable = ({ backGroundColor, textColor, text, onPress }: any) => (
  <Pressable
    style={[
      styles.elementContainer,
      {
        backgroundColor: backGroundColor,
      },
    ]}
    onPress={onPress}
  >
    <Text style={{ color: textColor }}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  elementContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: wp(3),
    borderRadius: wp(4),
    width: wp(25),
  },
  tabTow: {
    flexDirection: "row",
    marginTop: "auto",
    backgroundColor: "white",
    justifyContent: "center",
    padding: wp(3),
    gap: wp(25),
  },

  icon: {
    zIndex: 99999,
    borderRadius: 8888,
    bottom: hp(3.5),
    position: "absolute",
    alignSelf: "center",
  },
});
