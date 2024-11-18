import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
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

  const [permission, requestPermission] = useCameraPermissions();

  const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(sv.value, [0, 1], ["#020202", "#F60808"], "RGB", {
        gamma: 0.1,
      }),
    };
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 10,
          }}
        >
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

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
    runOnUI(() => {
      sv.value = 0;
      runOnJS(setRecording)(false);
      runOnJS(setPhotoSelected)(true);
    })();
  };
  const onPressVideo = () => {
    runOnUI(() => {
      sv.value = 1;
      runOnJS(setPhotoSelected)(false);
    })();
  };

  const startRecording = async () => {
    // const result = await cameraRef.current?.recordAsync();
    setRecording(true);
    console.log("====================================");
    // console.log(result);
    console.log("tesr");

    console.log("====================================");
  };

  const stopRecording = () => {
    // cameraRef.current?.stopRecording();

    setRecording(false);
  };

  const takeVideo = () => {
    setRecording(!recording);
    if (recording) stopRecording();
    else startRecording();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} />

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
          videoSelectedExp={photoSelectedExp}
          photoSelectedExp={videoSelectedExp}
          text={"Photo"}
          onPress={onPressPicture}
        />
        <CustomPressable
          videoSelectedExp={videoSelectedExp}
          photoSelectedExp={photoSelectedExp}
          text={"Video"}
          onPress={onPressVideo}
        />
      </View>

      <AnimatedMaterialIcon
        name={photoSelected ? "camera" : recording ? "stop" : "camera"}
        size={wp(18)}
        color="white"
        style={[styles.icon, animatedStyle]}
        onPress={photoSelected ? takePhoto : takeVideo}
      />
    </SafeAreaView>
  );
}

const CustomPressable = ({ videoSelectedExp, photoSelectedExp, text, onPress }: any) => (
  <Pressable
    style={[
      styles.elementContainer,
      {
        backgroundColor: videoSelectedExp,
      },
    ]}
    onPress={onPress}
  >
    <Text style={{ color: photoSelectedExp }}>{text}</Text>
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
    marginTop: "auto",
    flexDirection: "row",
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
