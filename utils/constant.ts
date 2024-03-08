import ReactNativeBlobUtil from "react-native-blob-util";
import * as LocalAuthentication from "expo-local-authentication";
import { MMKV } from "react-native-mmkv";

const fs = ReactNativeBlobUtil.fs;
const initialPath = fs.dirs.LegacyPictureDir + "/Progallery";

export { initialPath, fs, LocalAuthentication };
