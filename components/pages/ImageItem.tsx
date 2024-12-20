import React, { memo, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ReactNativeBlobUtilStat } from "react-native-blob-util";
import { useFileFetch } from "../../AppState/fetchFiles";
import { hp, isEven, wp } from "../../utils/dimonsions";

const ImageItem = ({ item }: { item: ReactNativeBlobUtilStat }) => {
  const blurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
  const imageIndex = useFileFetch((state) => state.getItemIndex(item));
  const [clicked, setClicked] = useState(false);
  const addToSelectedFiles = useFileFetch((state) => state.addToSelectedImages);

  return (
    <Link
      href={{
        pathname: "/[path]",
        params: { path: `${item.path}`, filename: item.filename },
      }}
      asChild
    >
      <Pressable>
        <Image
          placeholder={blurhash}
          source={{ uri: `file://${item.path}` }}
          style={[styles.image, { height: isEven(imageIndex) ? hp(30) : hp(28) }]}
        />
        <AntDesign
          style={{
            position: "absolute",
            bottom: isEven(imageIndex) ? wp(2) : wp(6.2),
            right: wp(1),
          }}
          name={clicked ? "checkcircle" : "checkcircleo"}
          size={wp(7)}
          color="black"
          onPress={() => {
            if (!clicked) {
              addToSelectedFiles(item!);
              setClicked(!clicked);
            } else {
              setClicked(!clicked);
            }
          }}
        />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    height: hp(30),
    width: wp(46),
    borderRadius: wp(4),
    marginBottom: hp(1),
  },
});

export default memo(ImageItem);
