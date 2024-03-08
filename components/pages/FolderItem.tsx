import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { WhiteFolderTab } from "../../utils/pages&svgUtils";
import { wp } from "../../utils/dimonsions";

import { AntDesign } from "@expo/vector-icons";
import { useFileFetch } from "../../AppState/fetchFiles";
import { ReactNativeBlobUtilStat } from "react-native-blob-util";
import { fs } from "../../utils/constant";
import { usePath } from "../../AppState/pathstate";
import Animated, { FadeIn, FadingTransition, StretchInX, ZoomIn } from "react-native-reanimated";

const Item = ({ item }: { item: ReactNativeBlobUtilStat | undefined }) => {
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [clicked, setClicked] = useState(false);
  const addToSelectedFiles = useFileFetch((state) => state.addToSelectedFolders);
  const path = usePath((state) => state.path);
  const setPathOnPress = usePath((state) => state.setPathOnPress);
  useEffect(() => {
    const getLength = async () => {
      const newdir = await fs.ls(`${path}/${item?.filename}`);
      setNumberOfFiles(newdir.length);
    };
    getLength();
  }, []);

  return (
    <Animated.View entering={StretchInX}>
      <Pressable
        onPress={() => {
          setPathOnPress(item!.filename);
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d3d3d3",
          padding: wp(5),
          borderRadius: wp(5),
          marginBottom: wp(3),
          width: wp(30.6),
        }}
      >
        <View style={{ padding: wp(3), backgroundColor: "black", borderRadius: wp(4) }}>
          <WhiteFolderTab style={{ zIndex: 1 }} height={wp(15)} width={wp(15)} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: wp(4) }}>{item?.filename}</Text>
          <Text>{numberOfFiles}</Text>
        </View>
        <AntDesign
          style={{ position: "absolute", bottom: wp(1), right: wp(1) }}
          name={clicked ? "checkcircle" : "checkcircleo"}
          size={wp(6)}
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
    </Animated.View>
  );
};

export default memo(Item);
