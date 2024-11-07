import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, FlatList, View, Pressable, Text, Button } from "react-native";

import Item from "@components/pages/FolderItem";
import useStateApp from "../../AppState/secureApp";
import { hp, wp } from "../../utils/dimonsions";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as rnfs from "react-native-fs";

import * as Lonki from "expo-linking";
import FolderItem from "@components/pages/FolderItem";
import { useFileFetch } from "../../AppState/fetchFiles";
import MyComponent from "@components/paperUtils/dialogtest";
import FabGroup from "@components/paperUtils/fabtest";
import ImageItem from "@components/pages/ImageItem";
import SercurDivider from "@components/pages/SecureDivider";

export default function ImagePage() {
  const images = useFileFetch((state) => state.images);

  const [state, setState] = React.useState({ open: false });

  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SercurDivider pageTitle="Tous Les Images" />
      <View style={{ alignItems: "center", marginTop: hp(1), flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={images}
          renderItem={({ item }) => <ImageItem item={item} />}
          columnWrapperStyle={{ gap: wp(2), flexWrap: "wrap" }}
        />
      </View>
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
