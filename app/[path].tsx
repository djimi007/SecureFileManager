import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useFoucsed } from "../AppState/backState";
import { Appbar, Icon } from "react-native-paper";
import { hp, wp } from "../utils/dimonsions";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlackFolderTab, WhiteFolderTab } from "../utils/pages&svgUtils";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const ImageDetails = () => {
  const { setIsFoucsed } = useFoucsed();
  const { path, filename } = useLocalSearchParams();

  useEffect(() => {
    setIsFoucsed(false);
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar style={{ backgroundColor: "black" }}>
          <Appbar.Content
            title="ProGallery"
            color="white"
            titleStyle={{ fontSize: wp(6), fontWeight: "600" }}
          />
          <Appbar.Action icon={require("@/assets/data/change.png")} color="white" />
        </Appbar>
        <View style={{ flex: 1, alignItems: "center", backgroundColor: Colors.white }}>
          <View style={styles.rowView}>
            <View style={styles.folderIcon}>
              <WhiteFolderTab height={wp(6)} width={wp(6)} />
            </View>
            <View style={{ backgroundColor: "red", flex: 1 }}>
              <Text style={{ fontSize: wp(4), fontWeight: "bold" }}>New Dossier</Text>
              <Text style={{}}>{filename}</Text>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
              source={{ uri: path.toLocaleString() }}
              style={{ width: wp(80), height: hp(60) }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ImageDetails;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    padding: wp(4),
    alignItems: "center",
    width: wp(100),
    justifyContent: "center",
  },
  folderIcon: {
    padding: wp(4),
    borderRadius: wp(5),
    backgroundColor: "black",
    marginRight: wp(3),
  },
});
