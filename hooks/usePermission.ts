import { useEffect, useState } from "react";

import { checkStoragePermission } from "../modules/permission-module";
import { useFirstLaunch } from "../AppState/firstlaunch";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";

export const usePermissions = () => {
  const [value, setValue] = useState(false);

  const [hasExternalStorage, setExternalSrorage] = useState(false);
  const [hasCamPermission] = useCameraPermissions();

  const [hasMicPermission] = useMicrophonePermissions();

  useEffect(() => {
    const checkPermissions = async () => {
      const hasExternalPermission = await checkStoragePermission();

      setExternalSrorage(hasExternalPermission);
      if (
        hasCamPermission?.granted &&
        hasMicPermission?.granted &&
        hasExternalPermission
      ) {
        setValue(true);
      } else {
        setValue(false);
      }
    };

    checkPermissions();
  }, [
    hasCamPermission?.granted,
    hasMicPermission?.granted,
    hasExternalStorage,
  ]);

  return value;
};
