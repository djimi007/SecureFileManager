import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  Text,
  Button,
  BackHandler,
  AppState,
  Alert,
} from "react-native";

import useStateApp from "../../AppState/secureApp";
import { hp, wp } from "../../utils/dimonsions";
import FolderItem from "@components/pages/FolderItem";
import { useFileFetch } from "../../AppState/fetchFiles";
import FabGroup from "@components/paperUtils/fabtest";
import { useLayoutState } from "../../AppState/fabvisible";
import MyDialog from "@components/paperUtils/dialogtest";
import { usePath } from "../../AppState/pathstate";
import { initialPath } from "../../utils/constant";

import useSecureApp from "../../AppState/secureApp";
import SercurDivider from "@components/pages/SecureDivider";
import { router } from "expo-router";
import { useFoucsed } from "../../AppState/backState";
import { useBackHandler, useAppState } from "@react-native-community/hooks";

import { useFocusEffect } from "@react-navigation/native";
import { Alerte } from "../../utils/alert";

export default function App() {
  const { folders, getDir, dirLength } = useFileFetch();

  const setPathOnBackPress = usePath((state) => state.setPathOnBackPress);

  const [state, setState] = React.useState({ open: false });

  const [visible, setVisible] = useState(false);

  const { secure } = useSecureApp();

  const { path, setPath } = usePath();
  const { isFoucsed, setIsFoucsed } = useFoucsed();

  const appState = useAppState();
  useFocusEffect(
    React.useCallback(() => {
      if (!secure && appState !== "active") setPath(initialPath);
      setIsFoucsed(true);
    }, [])
  );

  useBackHandler(() => {
    if (!secure) {
      if (path === initialPath && isFoucsed) {
        Alerte();
        return true;
      } else if (!isFoucsed) {
        router.back();
        return true;
      } else {
        setPathOnBackPress();
        return true;
      }
    } else {
      Alerte();
      return true;
    }
  });

  useEffect(() => {
    getDir(path);
  }, [path, dirLength]);

  return (
    <View style={styles.container}>
      <SercurDivider />
      <View style={{ marginTop: hp(1), paddingHorizontal: hp(1) }}>
        <FlatList
          numColumns={3}
          data={folders}
          renderItem={({ item }) => <FolderItem item={item} />}
          columnWrapperStyle={{ gap: wp(2), flexWrap: "nowrap" }}
        />
      </View>
      <FabGroup state={state} setState={setState} />
      <MyDialog visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(100),
    backgroundColor: "white",
  },
  fabButton: {
    flex: 1,
    backgroundColor: "white",
    position: "absolute",
    borderWidth: 1,
    borderColor: "blue",
    width: hp(7),
    height: hp(7),
    alignItems: "center",
    justifyContent: "center",
    bottom: hp(3),
    zIndex: 10,
    right: hp(3),
    borderRadius: hp(7),
    shadowOpacity: 1,
    shadowColor: "black",
    elevation: 5,
  },
});
