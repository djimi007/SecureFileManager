import { create } from "zustand";

import * as RNFS from "react-native-fs";

type FileFetchProp = {
  files: RNFS.ReadDirItem[];
  selectedFiles: RNFS.ReadDirItem[];
  createFile: (fileName: string, path: string) => void;
  deleteFiles: (selectedFiles: RNFS.ReadDirItem | RNFS.ReadDirItem[]) => void;
  editFile: (selectedFile: RNFS.ReadDirItem) => void;
  shareFiles: (selectedFiles: RNFS.ReadDirItem | RNFS.ReadDirItem[]) => void;
};

const useFileFetch = create<FileFetchProp>((set) => ({}));
