import React, { useEffect, useState } from "react";
import {
  Gesture,
  Directions,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";

import PageComponent from "@components/welcome_pages/pagesComponent";
import { wp } from "../utils/dimonsions";
import {
  requestExternalStroragePermission,
  checkStoragePermission,
} from "../modules/permission-module";
import { runOnJS } from "react-native-reanimated";
import { styles } from "../constants/styles";
import { pages } from "../utils/pages&svgUtils";
import { Redirect, router } from "expo-router";
import { useLayoutState } from "../AppState/fabvisible";
import { useFirstLaunch } from "../AppState/firstlaunch";
import { usePermissions } from "../hooks/usePermission";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
const index = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const { firstLaunch, setFirstLaunch } = useFirstLaunch();

  const setFabVisible = useLayoutState((state) => state.setFabVisible);

  const [hasCamPermission, requestCamPermission] = useCameraPermissions();

  const [hasMicPermission, requestMicPermission] = useMicrophonePermissions();

  const permissionAgreed = usePermissions();

  useEffect(() => {
    setFabVisible(false);
  }, []);

  const askCameraPermission = async () => {
    if (!hasCamPermission?.granted) {
      await requestCamPermission();
      return;
    }
  };
  const askMicPermission = async () => {
    if (!hasMicPermission?.granted) await requestMicPermission();
    return;
  };

  const askExternalStoragePermission = async () => {
    const isExternalStorageAvalible = await checkStoragePermission();
    if (!isExternalStorageAvalible) return requestExternalStroragePermission();
  };

  const compose = Gesture.Race(
    Gesture.Fling()
      .direction(Directions.RIGHT)

      .onEnd(
        runOnJS(() => {
          if (selectedItem < 1) return;
          setSelectedItem(selectedItem - 1);
        })
      ),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(
        runOnJS(() => {
          if (selectedItem > 2) return;
          setSelectedItem(selectedItem + 1);
        })
      )
  );

  const movmentPage = async () => {
    switch (selectedItem) {
      case 0:
        setSelectedItem(1);
        break;
      case 1:
        askExternalStoragePermission();
        setSelectedItem(selectedItem + 1);
        break;
      case 2:
        askCameraPermission();
        setSelectedItem(selectedItem + 1);
        break;
      case 3:
        askMicPermission();
        router.replace("/(tabs)");
        setFirstLaunch(false);
        break;
    }
  };

  if (!firstLaunch && permissionAgreed) return <Redirect href={"/(tabs)"} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={compose}>
          <View style={{ flex: 1 }}>
            <PageComponent selectedItem={selectedItem} />
            <Pressable style={styles.nextButton} onPress={movmentPage}>
              <Text style={{ fontSize: wp(5), color: "white" }}>
                {selectedItem === 0 ? "Next" : `Enable ${pages[selectedItem].title}`}
              </Text>
            </Pressable>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default index;
