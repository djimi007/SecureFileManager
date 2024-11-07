import ReactNativeBlobUtil from "react-native-blob-util";
import * as LocalAuthentication from "expo-local-authentication";
import Share from "react-native-share";
const fs = ReactNativeBlobUtil.fs;
const initialPath = fs.dirs.LegacyPictureDir + "/Progallery";

export { initialPath, fs, LocalAuthentication, Share };
