import { useAppState } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Camera,
  CameraPosition,
  TakePhotoOptions,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";
import { hp, wp } from "../../utils/dimonsions";

export default function CameraPage() {
  const camera = useRef<Camera>(null);

  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");
  const [photoSelected, setPhotoSelected] = useState(true);
  const [postition, setPosition] = useState<CameraPosition>("back");

  const photoSelectedExp = photoSelected ? "black" : "white";
  const videoSelectedExp = !photoSelected ? "black" : "white";

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";

  const { hasPermission: hasCamPermission, requestPermission: requestCamPermission } =
    useCameraPermission();

  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } =
    useMicrophonePermission();

  useEffect(() => {
    const askPermission = async () => {
      if (!hasCamPermission) {
        return await requestCamPermission();
      }
      if (!hasMicPermission) return await requestMicPermission();
    };

    askPermission();
  }, [hasCamPermission, hasMicPermission]);

  const device = useCameraDevice(postition);

  const takePhoto = async () => {
    const photo = await camera?.current?.takePhoto({
      flash: flash, // 'auto' | 'off'
    });
  };

  const onPressFlash = () => {
    if (flash === "off") setFlash("on");
    else setFlash("off");
  };

  if (device == null)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>no camera device in this phone</Text>
      </View>
    );

  const onPressPicture = () => {
    setPhotoSelected(true);
  };
  const onPressVideo = () => {
    setPhotoSelected(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        ref={camera}
        focusable
        enableHighQualityPhotos
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo
        video
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
          videoSelectedExp={videoSelectedExp}
          photoSelectedExp={photoSelectedExp}
          text={"Video"}
          onPress={onPressVideo}
        />
        <CustomPressable
          videoSelectedExp={photoSelectedExp}
          photoSelectedExp={videoSelectedExp}
          text={"Picture"}
          onPress={onPressPicture}
        />
      </View>

      <Image source={require("@/assets/icons/record.png")} style={styles.icon} />
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
    width: wp(18),
    height: wp(18),
    bottom: hp(3.5),
    position: "absolute",
    alignSelf: "center",
  },
});
