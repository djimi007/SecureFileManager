import ViewPager from "@components/pages/ViewPager";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { hp, wp } from "../utils/dimonsions";
import { WhiteFolderTab } from "../utils/pages&svgUtils";
import Share from "react-native-share";

const ImageDetails = () => {
  const { path, filename } = useLocalSearchParams();

  const [name, setFileName] = useState(filename);
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
              <Text>{name}</Text>
            </View>
            <Entypo name="dots-three-vertical" size={wp(8)} color="black" />
          </View>
          <ViewPager path={path} setFileName={setFileName} />
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
