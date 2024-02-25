import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { WhiteFolderTab } from "../../utils/pages&svgUtils";
import * as RNFS from "react-native-fs";
import { wp } from "../../utils/dimonsions";

import ReactNativeBlobUtil from "react-native-blob-util";
import useStateApp from "../../AppState/global_path";
import { AntDesign } from "@expo/vector-icons";
import { useFileFetch } from "../../AppState/fetchFiles";

const fs = ReactNativeBlobUtil.fs;
const Item = ({ item }: { item: RNFS.ReadDirItem }) => {
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [clicked, setClicked] = useState(false);

  const addToSelectedFiles = useFileFetch((state) => state.addToSelectedFile);
  const path = useStateApp((state) => state.path);

  useEffect(() => {
    const getLength = async () => {
      const newdir = await RNFS.readDir(`${path}/${item.name}`);
      setNumberOfFiles(newdir.length);
    };
    getLength();
  }, []);

  return (
    <Pressable
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d3d3d3",
        padding: wp(5),
        borderRadius: wp(5),
        marginBottom: wp(3),
      }}
    >
      <View style={{ padding: wp(3), backgroundColor: "black", borderRadius: wp(4) }}>
        <WhiteFolderTab style={{ zIndex: 1 }} height={wp(15)} width={wp(15)} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: wp(4) }}>{item.name}</Text>
        <Text>{numberOfFiles}</Text>
      </View>
      <AntDesign
        style={{ position: "absolute", bottom: wp(1), right: wp(1) }}
        name={clicked ? "checkcircle" : "checkcircleo"}
        size={wp(6)}
        color="black"
        onPress={() => {
          if (!clicked) {
            addToSelectedFiles(item);
            setClicked(!clicked);
          } else {
            setClicked(!clicked);
          }
        }}
      />
    </Pressable>
  );
};

export default memo(Item);
