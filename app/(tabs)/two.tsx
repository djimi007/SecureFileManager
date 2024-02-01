import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useAppState } from "@react-native-community/hooks";
import {
  Camera,
  CameraPosition,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

export default function Page() {
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

  if (device == null)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>no camera device in this phone</Text>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        focusable
        enableHighQualityPhotos
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo
        video
      />
    </SafeAreaView>
  );
}
