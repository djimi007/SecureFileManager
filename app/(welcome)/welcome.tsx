import React, { useState } from "react";
import {
  Gesture,
  Directions,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";

import PageComponent from "@components/pagesComponent";
import pages from "@/assets/data/welcom_pages.json";
const index = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const compose = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {
        if (selectedItem < pages.length) setSelectedItem(selectedItem + 1);
      }),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {})
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black", padding: 20 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={compose}>
          <PageComponent selectedItem={selectedItem} />
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default index;
