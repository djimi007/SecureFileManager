import { Alert, BackHandler } from "react-native";

export const Alerte = () => {
  Alert.alert("Hold on!", "Are you sure you want to go back?", [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel",
    },
    { text: "YES", onPress: () => BackHandler.exitApp() },
  ]);
};
