import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import AnimatedMaterialIcon from "@components/animated/AnimatedMaterialIcon";
import { useFileFetch } from "../../AppState/fetchFiles";
import { usePath } from "../../AppState/pathstate";
import { hp, wp } from "../../utils/dimonsions";

export default function CameraPage() {
  const [flash, setFlash] = useState<boolean>(false);
  const [photoSelected, setPhotoSelected] = useState(true);
  const [position, setPosition] = useState<CameraType>("back");
  const [recording, setRecording] = useState<boolean>(false);

  const { path } = usePath();
  const { createImageFile } = useFileFetch();
  const cameraRef = useRef<CameraView>(null);

  const takePhoto = async () => {
    try {
      const photo = await cameraRef?.current?.takePictureAsync({
        quality: 1,
      });
      if (photo) {
        await createImageFile(path, photo);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const startRecording = async () => {
    if (recording || !cameraRef.current) return;

    try {
      console.log("Starting recording...");
      const videoRecordPromise = cameraRef.current.recordAsync();
      setRecording(true);

      const video = await videoRecordPromise;
      console.log("Video recorded:", video);
    } catch (error) {
      console.error("Recording failed:", error);
      setRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording || !cameraRef.current) return;

    try {
      console.log("Stopping recording...");
      await cameraRef.current.stopRecording();
      setRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const toggleRecording = async () => {
    if (recording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const onPressPicture = () => {
    if (recording) {
      stopRecording();
    }
    setRecording(false);
    setPhotoSelected(true);
  };

  const onPressVideo = () => {
    setPhotoSelected(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        facing={position}
        mode={photoSelected ? "picture" : "video"}
        enableTorch={flash}
      />

      <AnimatedMaterialIcon
        photoSelected={photoSelected}
        recording={recording}
        takePhoto={takePhoto}
        toggleRecording={toggleRecording}
      />

      <Ionicons
        name={flash ? "flash-off" : "flash"}
        size={wp(7)}
        color="white"
        style={{ position: "absolute", right: wp(3), top: hp(3) }}
        onPress={() => setFlash(!flash)}
      />

      <MaterialIcons
        name="flip-camera-android"
        size={wp(7)}
        color="white"
        onPress={() => setPosition(position === "back" ? "front" : "back")}
        style={{ position: "absolute", right: wp(3), top: hp(9) }}
      />

      <View style={styles.tabTow}>
        <CustomPressable
          backGroundColor={!photoSelected ? "white" : "black"}
          textColor={!photoSelected ? "black" : "white"}
          text="Photo"
          onPress={onPressPicture}
        />
        <CustomPressable
          backGroundColor={photoSelected ? "white" : "black"}
          textColor={photoSelected ? "black" : "white"}
          text="Video"
          onPress={onPressVideo}
        />
      </View>
    </SafeAreaView>
  );
}

const CustomPressable = ({
  backGroundColor,
  textColor,
  text,
  onPress,
}: any) => (
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
