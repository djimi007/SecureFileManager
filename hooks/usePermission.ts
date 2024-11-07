import { useEffect, useState } from "react";
import { useCameraPermission, useMicrophonePermission } from "react-native-vision-camera";
import { requestPermission } from "../modules/permission-module";
import { useFirstLaunch } from "../AppState/firstlaunch";

export const usePermissions = () => {
  const firstLaunch = useFirstLaunch((state) => state.firstLaunch);
  const [value, setValue] = useState(false);
  const { hasPermission: hasCamPermission } = useCameraPermission();
  const { hasPermission: hasMicPermission } = useMicrophonePermission();

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
