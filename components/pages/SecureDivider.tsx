import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-paper";
import useSecureApp from "../../AppState/secureApp";
import { hp, wp } from "../../utils/dimonsions";

const SercurDivider = ({ pageTitle }: { pageTitle: string }) => {
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
        <Text style={{ flex: 1, fontWeight: "600", fontSize: wp(4.5) }}>{pageTitle}</Text>
        <Entypo
          name={secure ? "lock" : "lock-open"}
          size={wp(7.5)}
          color="black"
          onPress={() => {
            setSecure(secure);
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
