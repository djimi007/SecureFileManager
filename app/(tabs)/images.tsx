import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { hp, wp } from "../../utils/dimonsions";

import ImageItem from "@components/pages/ImageItem";
import SercurDivider from "@components/pages/SecureDivider";
import { useFileFetch } from "../../AppState/fetchFiles";

export default function ImagePage() {
  const images = useFileFetch((state) => state.images);

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
