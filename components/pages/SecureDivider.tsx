import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../utils/dimonsions";
import { Entypo } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { LocalAuthentication } from "../../utils/constant";
import useSecureApp from "../../AppState/secureApp";

const SercurDivider = () => {
  const { secure, setSecure } = useSecureApp();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: hp(3),
          marginHorizontal: wp(5),
          justifyContent: "center",
        }}
      >
        <Text style={{ flex: 1, fontWeight: "600", fontSize: wp(4) }}>Tous Les Dossier</Text>
        <Entypo
          name={secure ? "lock" : "lock-open"}
          size={wp(7)}
          color="black"
          onPress={() => {
            setSecure(!secure);
          }}
        />
      </View>
      <Divider
        style={{
          borderWidth: wp(0.6),
          borderColor: "black",
          marginHorizontal: wp(5),
          borderRadius: wp(2),
        }}
      />
    </View>
  );
};

export default SercurDivider;

const styles = StyleSheet.create({});
