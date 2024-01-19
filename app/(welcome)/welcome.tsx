import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import { pages } from "../../constants/welcom_pages";

import Animated from "react-native-reanimated";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const { height, width } = Dimensions.get("window");

  const compose = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => {}),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => {})
  );

  return (
    <GestureDetector gesture={compose}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "black", padding: 20 }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Animated.View style={styles.animationContainer}>
            <FontAwesome
              name={pages[selectedItem].icon}
              size={100}
              color={"green"}
            />
          </Animated.View>

          <View
            style={[
              styles.buttonsContainer,
              { marginBottom: height / 95 },
            ]}
          >
            <Pressable style={styles.nextButton}>
              <Text style={styles.nextText}>next</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default index;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
  },
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },

  nextButton: {
    backgroundColor: "#03EEB5",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  nextText: {
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
});
