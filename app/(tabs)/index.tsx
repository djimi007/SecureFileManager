import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import * as RNFS from "react-native-fs";
import * as MediaLibrary from "expo-media-library";
import { Redirect, router } from "expo-router";

import * as IntentLauncher from "expo-intent-launcher";
import { requestPermission, sayThink } from "../../modules/my-module";

export default function App() {
  return <Redirect href="/welcome" />;
  const [path, setPath] = useState("");
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  const initialPath =
    RNFS.ExternalStorageDirectoryPath + "/Pictures/Progallery";

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    () => {
      if (path === initialPath) {
        return true;
      }
    }
  );
  const readFromDir = async () => {
    // setFiles(await RNFS.readDir(initialPath));
    if (Platform.OS === "android") {
      router.push("/(welcome)/welcome");
    }
  };
  const offset = useSharedValue(150);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={readFromDir}>
        <Text style={[{ fontSize: 20, margin: 5 }]}>
          {sayThink("life")}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
  textDark: {
    fontSize: 20,
    color: "blue",
  },
  texLight: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
  },
});
