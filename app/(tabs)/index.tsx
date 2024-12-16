import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable, Text } from "react-native";

import FolderItem from "@components/pages/FolderItem";

import { useLayoutState } from "../../AppState/fabvisible";
import { useFileFetch } from "../../AppState/fetchFiles";
import { usePath } from "../../AppState/pathstate";
import { initialPath } from "../../utils/constant";
import { hp, wp } from "../../utils/dimonsions";

import SercurDivider from "@components/pages/SecureDivider";
import { useAppState, useBackHandler } from "@react-native-community/hooks";
import { router } from "expo-router";
import { useFoucsed } from "../../AppState/backState";
import useSecureApp from "../../AppState/secureApp";

import { useFocusEffect } from "@react-navigation/native";
import FabGroup from "@components/PaperComponent/Fab";
import { Alerte } from "../../utils/alert";
import FileEditDialog from "@components/PaperComponent/DialogFolder";

export default function App() {
  const { folders, getDir, dirLength, notify } = useFileFetch();

  const setPathOnBackPress = usePath((state) => state.setPathOnBackPress);

  const { secure, checkAuth } = useSecureApp();

  const { path, setPath } = usePath();
  const { isFoucsed, setIsFoucsed } = useFoucsed();

  const appState = useAppState();

  const { visibleFab, setFabVisible } = useLayoutState();

  useEffect(() => {
    setFabVisible(true);
  }, []);

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
      checkAuth();
      return true;
    }
  });

  useEffect(() => {
    getDir(path);
  }, [path, dirLength, notify]);

  return (
    <View style={styles.container}>
      <SercurDivider pageTitle="Tous Les Dossiers" />
      <View style={{ marginTop: hp(1), paddingHorizontal: hp(1) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={folders}
          renderItem={({ item }) => <FolderItem item={item} />}
          columnWrapperStyle={{ gap: wp(2), flexWrap: "nowrap" }}
        />
      </View>
      {visibleFab && <FabGroup />}
      <FileEditDialog
        isFolder={true}
        text="Create Folder"
        filePath={undefined}
      />
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
