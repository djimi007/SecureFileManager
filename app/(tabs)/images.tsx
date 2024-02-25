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
import ImageItem from "@components/pages/ImageItem";

export default function ImagePage() {
  const path = useStateApp((state) => state.path);
  const getImages = useFileFetch((state) => state.getImages);
  const images = useFileFetch((state) => state.images);
  const length = useFileFetch((state) => state.imagesLength);

  const [state, setState] = React.useState({ open: false });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getImages(path);
  }, [length]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: hp(1) }}>
        <FlatList
          numColumns={2}
          data={images}
          renderItem={({ item }) => <ImageItem item={item} />}
          columnWrapperStyle={{ gap: wp(2), flexWrap: "nowrap" }}
        />
      </View>

      <FabGroup state={state} setState={setState} />
      <MyComponent visible={visible} setVisible={setVisible} />
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
