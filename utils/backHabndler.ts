import { BackHandler } from "react-native/Libraries/Utilities/BackHandler";

const backHandler = () => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    return false;
  });
};
