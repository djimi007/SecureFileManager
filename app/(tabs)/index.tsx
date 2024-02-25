import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, FlatList, View, Pressable, Text, Button } from "react-native";

import Item from "@components/pages/FolderItem";
import useStateApp from "../../AppState/global_path";
import { hp, wp } from "../../utils/dimonsions";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as rnfs from "react-native-fs";

import * as Lonki from "expo-linking";
import FolderItem from "@components/pages/FolderItem";
import { useFileFetch } from "../../AppState/fetchFiles";
import MyComponent from "@components/paperUtils/dialogtest";
import FabGroup from "@components/paperUtils/fabtest";
import { useLayoutState } from "../../AppState/fabvisible";
import MyDialog from "@components/paperUtils/dialogtest";

export default function App() {
  const path = useStateApp((state) => state.path);
  const getFolders = useFileFetch((state) => state.getFolders);
  const files = useFileFetch((state) => state.folders);
  const length = useFileFetch((state) => state.foldersLength);

  const [state, setState] = React.useState({ open: false });

  const [visible, setVisible] = useState(false);

  const setFabVisible = useLayoutState((state) => state.setFabVisible);

  useEffect(() => {
    setFabVisible(true);
  }, []);

  useEffect(() => {
    getFolders(path);
  }, [length]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: hp(1) }}>
        <FlatList
          numColumns={3}
          data={files}
          renderItem={({ item }) => <FolderItem item={item} />}
          columnWrapperStyle={{ gap: wp(2), flexWrap: "nowrap" }}
        />
      </View>
      <FabGroup state={state} setState={setState} />
      <MyDialog visible={visible} setVisible={setVisible} />
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
    borderRadius: hp(7),
    shadowOpacity: 1,
    shadowColor: "black",
    elevation: 5,
  },
});
