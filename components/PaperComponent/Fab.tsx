import * as React from "react";
import { FAB, Portal } from "react-native-paper";
import { useDialogFolder, useLayoutState } from "../../AppState/fabvisible";
import { hp } from "../../utils/dimonsions";

const FabGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const visibleFab = useLayoutState((state) => state.visibleFab);

  const { showDialog } = useDialogFolder();

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
