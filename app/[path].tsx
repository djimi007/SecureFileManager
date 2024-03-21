import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useFoucsed } from "../AppState/backState";
import { Appbar, Icon, Portal, Surface } from "react-native-paper";
import { hp, wp } from "../utils/dimonsions";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlackFolderTab, WhiteFolderTab } from "../utils/pages&svgUtils";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import ViewPager from "@components/pages/ViewPager";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ImageDetails = () => {
  const { path, filename } = useLocalSearchParams();
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
              <WhiteFolderTab height={wp(8)} width={wp(8)} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: wp(4), fontWeight: "bold" }}>New Dossier</Text>
              <Text>{filename}</Text>
            </View>
            <Entypo name="dots-three-vertical" size={wp(8)} color="black" />
          </View>
          <ViewPager path={path} />
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
    padding: wp(3),
    borderRadius: wp(5),
    backgroundColor: "black",
    marginRight: wp(3),
  },
});
