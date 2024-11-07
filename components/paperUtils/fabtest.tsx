import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { hp } from "../../utils/dimonsions";
import { useDialog, useLayoutState } from "../../AppState/fabvisible";

import FolderCreation from "./dialogtest";

const FabGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const visibleFab = useLayoutState((state) => state.visibleFab);

  const { visible, showDialog, dimissDialog } = useDialog();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        fabStyle={{ backgroundColor: "white" }}
        backdropColor="transparent"
        color="black"
        style={{ marginBottom: hp(9) }}
        open={open && visibleFab}
        visible={visibleFab}
        icon={open ? "close" : "plus"}
        rippleColor={"black"}
        actions={[
          {
            icon: "folder",
            labelStyle: { color: "black" },
            label: "nv dossier",
            onPress: () => {
              showDialog();
            },
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
