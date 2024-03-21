import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Text, TextInput } from "react-native-paper";

const MyDialog = () => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="folder" />
        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>
        <Dialog.Content>
          <TextInput />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default MyDialog;
