import { StyleSheet } from "react-native";
import { hp, wp } from "../utils/dimonsions";

export const styles = StyleSheet.create({
  icons: { height: hp(70), width: wp(80) },
  nextButton: {
    padding: wp(3),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: wp(3),
    alignItems: "center",
    marginLeft: wp(2),
    marginRight: wp(2),
    marginTop: "auto",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: hp(5),
  },
  title: {
    fontSize: wp(8),
    color: "white",
  },
  description: {
    fontSize: wp(4),
    color: "white",
  },
});
