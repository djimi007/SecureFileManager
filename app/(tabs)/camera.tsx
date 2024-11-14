import { useAppState } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType, CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { hp, wp } from "../../utils/dimonsions";
import { media } from "../../utils/constant";
import { usePath } from "../../AppState/pathstate";
import { useSharedValue } from "react-native-reanimated";

export default function CameraPage() {
  const [flash, setFlash] = useState<FlashMode>("off");
  const [photoSelected, setPhotoSelected] = useState(true);
  const [postition, setPosition] = useState<CameraType>("back");
  const { path } = usePath();

  const cameraRef = useRef<CameraView>(null);

  const photoSelectedExp = photoSelected ? "black" : "white";
  const videoSelectedExp = !photoSelected ? "black" : "white";

  const [permission, requestPermission] = useCameraPermissions();

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
    // const photo = await camera?.current?.takePhoto({
    //   flash: flash,
    // });

    const pic = await cameraRef?.current?.takePictureAsync({
      quality: 1,
    });

    console.log(pic);
    if (!pic) console.warn("try again");

    try {
      await media.writeToMediafile("file://" + path + "/filename.png", pic!.uri);
      console.log("file://" + path + "/filename.png");
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const onPressFlash = () => {
    if (flash === "off") setFlash("on");
    else setFlash("off");
  };

  const onPressPicture = () => {
    setPhotoSelected(true);
  };
  const onPressVideo = () => {
    setPhotoSelected(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Camera
        ref={cameraRef}
        focusable
        enableHighQualityPhotos
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        exposure={2}
        photo
        video
        format={format}
      /> */}
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

      {photoSelected ? (
        <MaterialIcons
          name="camera"
          size={wp(18)}
          color="white"
          style={styles.iconPic}
          onPress={takePhoto}
        />
      ) : (
        <Image source={require("@/assets/icons/record.png")} style={styles.iconVid} />
      )}
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
  iconVid: {
    width: wp(19),
    height: wp(19),
    bottom: hp(3),
    position: "absolute",
    alignSelf: "center",
  },
  iconPic: {
    zIndex: 99999,
    backgroundColor: "black",
    borderRadius: 8888,
    bottom: hp(3.5),
    position: "absolute",
    alignSelf: "center",
  },
});
