import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { hp } from "../../utils/dimonsions";
import { useLayoutState } from "../../AppState/fabvisible";
import { StyleSheet } from "react-native";

interface Props {
  state: {
    open: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
    }>
  >;
}

const FabGroup = ({ state, setState }: Props) => {
  const visibleFab = useLayoutState((state) => state.visibleFab);

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        fabStyle={{ backgroundColor: "white" }}
        style={{ marginBottom: hp(9) }}
        open={open}
        visible={visibleFab}
        icon={open ? "close" : "plus"}
        rippleColor={"black"}
        actions={[
          {
            icon: "folder",
            label: "nv dossier",
            onPress: () => console.log("Pressed new Folder"),
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
