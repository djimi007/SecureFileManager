import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import * as RNFS from "react-native-fs";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";

export default function App() {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState<RNFS.ReadDirItem[]>([]);
  const initialPath =
    RNFS.ExternalStorageDirectoryPath + "/Pictures/Progallery";
  const [permissionResponse, requestPermission] =
    MediaLibrary.usePermissions();

  // if (!permissionResponse?.granted) return;
  const readFromDir = async () => {
    setFiles(await RNFS.readDir(initialPath));
    if (Platform.OS === "android") {
      router.push("/(welcome)/welcome");
    }
  };
  const offset = useSharedValue(150);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={readFromDir}>
        <Text style={{ fontSize: 20, margin: 5 }}>click me</Text>
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
});
