import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { useFileFetch } from "../../AppState/fetchFiles";
import { useDialogFolder } from "../../AppState/fabvisible";
import { usePath } from "../../AppState/pathstate";

interface Props {
  text: string;
  isFolder: boolean;
  filePath: string | undefined;
}

const FileEditDialog = ({ text, isFolder, filePath }: Props) => {
  const { visible, dimissDialog } = useDialogFolder();

  const [fileName, setFileName] = useState("");
  const { path } = usePath();

  const { createFolder, editFile } = useFileFetch();

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={dimissDialog}
          contentContainerStyle={styles.containerStyle}
        >
          <Text style={styles.text}>{text}</Text>
          <TextInput
            mode="outlined"
            label="Folder Name"
            placeholder="Enter folder name"
            textColor="black"
            style={styles.inputStyle}
            outlineStyle={styles.outLine}
            activeOutlineColor="#000"
            contentStyle={styles.contentStyle}
            onChangeText={setFileName}
            value={fileName}
          />
          <Button
            mode="contained"
            onPress={() => {
              // Call createFolder here
              isFolder
                ? (async () => await createFolder(fileName, path))()
                : editFile(filePath!, path, fileName);
              dimissDialog();
            }}
            style={{
              backgroundColor: "#000",
              borderRadius: 12,
              paddingVertical: 12,
              elevation: 2,
            }}
            labelStyle={{
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: 0.5,
              color: "white",
            }}
          >
            Save
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 24,
    margin: 20,
    borderRadius: 16,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1a1a1a",
  },
  inputStyle: {
    backgroundColor: "white",
    marginBottom: 24,
  },
  outLine: {
    borderColor: "#000",
    borderRadius: 12,
    borderWidth: 1.5,
  },
  contentStyle: {
    paddingHorizontal: 16,
    height: 56,
  },
});

export default FileEditDialog;
