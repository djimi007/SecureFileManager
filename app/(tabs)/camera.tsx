import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  FlashMode
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import AnimatedMaterialIcon from "@components/animated/AnimatedMaterialIcon";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useFileFetch } from "../../AppState/fetchFiles";
import { usePath } from "../../AppState/pathstate";
import { hp, wp } from "../../utils/dimonsions";

export default function CameraPage() {

  const [flash, setFlash] = useState<FlashMode>("off");

  const [photoSelected, setPhotoSelected] = useState(true);



  const [postition, setPosition] = useState<CameraType>("back");
  const { path } = usePath();

  const { createImageFile } = useFileFetch();

  const cameraRef = useRef<CameraView>(null);

  const [recording, setRecording] = useState<boolean>(false);




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
    // sv.value = withTiming("black");
    setRecording(false);
    setPhotoSelected(true);

  };

  const onPressVideo = () => {
    // sv.value = withTiming("red"); 
    setPhotoSelected(false);
  };

  const startRecording = async () => {
    try {
      const result = await cameraRef.current?.recordAsync();
      
      console.log(result);
      setRecording(true);
      
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
    setRecording(false);
  };
  
  //FIXME [Error: Video recording failed: Recording was stopped before any data could be produced.]

  const takeVideo = () => {    
    if (recording) stopRecording();
    else startRecording();
    setRecording(!recording)
    
  };

return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        flash={flash}
      />
        <AnimatedMaterialIcon photoSelected={photoSelected}  recording={recording}  takePhoto={takePhoto} takeVideo={takeVideo}/>

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
