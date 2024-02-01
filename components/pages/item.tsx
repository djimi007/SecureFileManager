import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { BlackFolderTab } from "../../utils/pages&svgUtils";
import * as RNFS from "react-native-fs";
import { hp, wp } from "../../utils/dimonsions";
import FastImage from "react-native-fast-image";

import ReactNativeBlobUtil from "react-native-blob-util";
import { TouchableOpacity } from "react-native-gesture-handler";
import Share from "react-native-share";

const fs = ReactNativeBlobUtil.fs;
const Item = ({ item }: { item: RNFS.ReadDirItem }) => {
  const [uri, setUri] = useState("");

  const option = {
    url: uri !== null && `data:image/jpg;base64,${uri}`,
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const filePath = item.path; // Access path directly for potential speed gains
        const uri = await RNFS.readFile(filePath, "base64"); // Use RNFS for optimized reading
        setUri(uri);
      } catch (error) {
        console.error("Error loading image:", error);
        // Handle errors gracefully, e.g., display a placeholder image or error message
      }
    };

    loadImage();
  }, [item.path]); // Re-run effect if item.path changes

  return (
    <Pressable>
      <BlackFolderTab />
    </Pressable>
  );
};

export default memo(Item);
