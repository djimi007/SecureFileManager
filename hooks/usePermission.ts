import { useEffect, useState } from "react";

import { requestPermission } from "../modules/permission-module";
import { useFirstLaunch } from "../AppState/firstlaunch";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";

export const usePermissions = () => {
  const firstLaunch = useFirstLaunch((state) => state.firstLaunch);
  const [value, setValue] = useState(false);

  const [hasCamPermission, requestCamPermission] = useCameraPermissions();

  const [hasMicPermission, requestMicPermission] = useMicrophonePermissions();

  useEffect(() => {
    const checkPermissions = async () => {
      const hasExternalPermission = await requestPermission();
      if (!firstLaunch && hasCamPermission && hasMicPermission && hasExternalPermission) {
        setValue(true);
      } else {
        setValue(false);
      }
    };

    checkPermissions();
  }, [firstLaunch, hasCamPermission, hasMicPermission]);

  return value;
};
