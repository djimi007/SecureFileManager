import { View } from "react-native";
import React from "react";

import InitialePage from "./InisialePage";
import FolderComponent from "./StorageAccessPage";
import CameraComponent from "./CameraPermissionPage";
import MicComponent from "./MicPermissionPage";

interface Props {
  selectedItem: number;
}

const PageComponent = ({ selectedItem }: Props) => {
  return (
    <View>
      {selectedItem === 1 ? (
        <FolderComponent />
      ) : selectedItem === 2 ? (
        <CameraComponent />
      ) : selectedItem === 3 ? (
        <MicComponent />
      ) : (
        <InitialePage />
      )}
    </View>
  );
};

export default PageComponent;
