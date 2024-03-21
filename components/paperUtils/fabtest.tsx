import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { hp } from "../../utils/dimonsions";
import { useLayoutState } from "../../AppState/fabvisible";
import { StyleSheet } from "react-native";
import { useFileFetch } from "../../AppState/fetchFiles";

const FabGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const visibleFab = useLayoutState((state) => state.visibleFab);

  const createFolder = useFileFetch((state) => state.createFolder);

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        fabStyle={{ backgroundColor: "white" }}
        backdropColor="transparent"
        style={{ marginBottom: hp(9) }}
        open={open && visibleFab}
        visible={visibleFab}
        icon={open ? "close" : "plus"}
        rippleColor={"black"}
        actions={[
          {
            icon: "folder",
            label: "nv dossier",
            onPress: () => {},
            color: "black",
            style: { backgroundColor: "white" },
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default FabGroup;
