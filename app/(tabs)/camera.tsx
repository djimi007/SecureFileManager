import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useAppState } from "@react-native-community/hooks";

import {
  Camera,
  CameraPosition,
  TakePhotoOptions,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";
import { useLayoutState } from "../../AppState/fabvisible";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { hp, wp } from "../../utils/dimonsions";
import { Card, Chip } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { Image } from "expo-image";

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");

  const [captureSelected, setCaptureSelected] = useState(true);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const [postition, setPosition] = useState<CameraPosition>("back");

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

  if (device == null)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>no camera device in this phone</Text>
      </View>
    );

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
        onPress={() => {
          if (flash === "off") setFlash("on");
          else setFlash("off");
        }}
      />
      <MaterialIcons
        name="flip-camera-android"
        size={wp(7)}
        color="white"
        style={{ position: "absolute", right: wp(3), top: hp(9) }}
      />
      <View
        style={{
          marginTop: "auto",
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "center",
          padding: wp(3),
          gap: wp(25),
        }}
      >
        <View style={styles.elementContainer}>
          <Text style={{ color: "white" }}>Vidéo</Text>
        </View>
        <View style={styles.elementContainer}>
          <Text style={{ color: "white" }}>Photo</Text>
        </View>
      </View>

      <Image
        source={require("@/assets/icons/record.png")}
        style={{
          width: wp(18),
          height: wp(18),
          bottom: hp(3.5),
          position: "absolute",
          alignSelf: "center",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elementContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: wp(3),
    borderRadius: wp(4),
    width: wp(25),
  },
});
