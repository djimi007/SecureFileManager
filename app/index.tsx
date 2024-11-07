import React, { useEffect, useState } from "react";
import {
  Gesture,
  Directions,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";

import PageComponent from "@components/welcome_pages/pagesComponent";
import { wp } from "../utils/dimonsions";
import { requestPermission } from "../modules/permission-module";
import { useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import { runOnJS } from "react-native-reanimated";
import { styles } from "../constants/styles";
import { pages } from "../utils/pages&svgUtils";
import { Redirect, router } from "expo-router";
import { useLayoutState } from "../AppState/fabvisible";
import { useFirstLaunch } from "../AppState/firstlaunch";
import { usePermissions } from "../hooks/usePermission";
const index = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const setFirstLaunch = useFirstLaunch((state) => state.setFirstLaunch);

  const setFabVisible = useLayoutState((state) => state.setFabVisible);

  const permissionAgreed = usePermissions();

  const { hasPermission: hasCamPermission, requestPermission: requestCamPermission } =
    useCameraPermission();

  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } =
    useMicrophonePermission();

  useEffect(() => {
    setFirstLaunch(false);
    setFabVisible(false);
  }, []);

  if (permissionAgreed) return <Redirect href="/(tabs)" />;

  const askCameraPermission = async () => {
    if (!hasCamPermission) {
      return await requestCamPermission();
    }
  };
  const askMicPermission = async () => {
    if (!hasMicPermission) return await requestMicPermission();
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
        await requestPermission();
        setSelectedItem(selectedItem + 1);
        break;
      case 2:
        askCameraPermission();
        setSelectedItem(selectedItem + 1);
        break;
      case 3:
        askMicPermission();
        router.replace("/(tabs)");
        break;
    }
  };

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
