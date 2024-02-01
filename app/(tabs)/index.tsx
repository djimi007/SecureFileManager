import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Pressable, Text, Button } from "react-native";

import Item from "@components/pages/item";
import useStateApp from "../../AppState/global_path";
import { hp } from "../../utils/dimonsions";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
export default function App() {
  const path = useStateApp((state) => state.path);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const getFiles = async () => {};
  }, []);

  const [clicked, setClicked] = useState(false);
  const sv = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: clicked ? `${sv.value + 45}deg` : `${sv.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <FlatList numColumns={3} data={files} renderItem={({ item }) => <Item item={item} />} />
      <Animated.View style={[styles.fabButton, animationStyle]}>
        <Pressable>
          <Text style={{ fontSize: hp(3) }}>+</Text>
        </Pressable>
      </Animated.View>
      <Button
        title="click"
        onPress={() => {
          setClicked(!clicked);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(100),
    backgroundColor: "white",
  },
  fabButton: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    borderWidth: 1,
    borderColor: "blue",
    width: hp(7),
    height: hp(7),
    alignItems: "center",
    justifyContent: "center",
    bottom: hp(3),
    zIndex: 10,
    right: hp(3),
    borderRadius: hp(2),
    shadowOpacity: 1,
    shadowColor: "black",
    elevation: 5,
  },
});
