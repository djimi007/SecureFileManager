import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as RNFS from "react-native-fs";
import { Image } from "expo-image";
import { hp, wp } from "../../utils/dimonsions";
const ImageItem = ({ item }: { item: RNFS.ReadDirItem }) => {
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
    <View style={{}}>
      <Image
        source={{ uri: `data:image/jpg;base64,${uri}` }}
        style={{ height: hp(30), width: wp(46) }}
      />
    </View>
  );
};

export default ImageItem;

const styles = StyleSheet.create({});
