import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, FadeIn } from "react-native-reanimated";

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: "TEST PAGE" }} />

      <View style={styles.container}>
        <Animated.View
          style={[styles.ball]}
          entering={FadeIn.delay(2000)}
        />
        <Animated.View style={[styles.box]} entering={FadeIn} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "row",
  },
  ball: {
    height: 50,
    width: 50,
    backgroundColor: "#b58df1",
    borderRadius: 50,
    marginRight: 80,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "#b58df1",
    borderRadius: 15,
  },
});
