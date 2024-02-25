import { create } from "zustand";

import * as RNFS from "react-native-fs";
import Share from "react-native-share";
type FileFetchProp = {
  folders: RNFS.ReadDirItem[];
  images: RNFS.ReadDirItem[];
  foldersLength: number;
  imagesLength: number;
  selectedFiles: RNFS.ReadDirItem[];
  addToSelectedFile: (selectedFile: RNFS.ReadDirItem) => void;
  getFolders: (path: string) => Promise<void>;
  getImages: (path: string) => Promise<void>;
  createFolder: (folderName: string, path: string) => Promise<void>;
  deleteFiles: (selectedFiles: RNFS.ReadDirItem[]) => Promise<void>;
  editFile: (selectedFile: RNFS.ReadDirItem, name: string) => Promise<void>;
  shareFiles: (selectedFiles: RNFS.ReadDirItem[]) => void;
};

export const useFileFetch = create<FileFetchProp>((set, get) => ({
  folders: [],
  images: [],
  foldersLength: 0,
  imagesLength: 0,
  selectedFiles: [],
  addToSelectedFile: (selectedFile: RNFS.ReadDirItem) =>
    set((state) => ({ selectedFiles: [...state.selectedFiles, selectedFile] })),
  getFolders: async (path: string) => {
    try {
      let result = await RNFS.readDir(path);
      set({ foldersLength: result.length });
      result = result.filter((e) => e.isDirectory());
      set({ folders: result });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  getImages: async (path: string) => {
    try {
      let result = await RNFS.readDir(path);
      set({ imagesLength: result.length });
      result = result.filter((e) => e.isFile());
      set({ images: result });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },

  createFolder: async (folderName: string, path: string) => {
    try {
      await RNFS.mkdir(`${path}/${folderName}`);
    } catch (error) {
      console.log(error);
    }
  },
  deleteFiles: async (selectedFiles: RNFS.ReadDirItem[]) => {
    selectedFiles.forEach((element) => {
      RNFS.unlink(element.path).catch((e) => {
        console.log(e);
      });
    });
  },
  editFile: async (selectedFile: RNFS.ReadDirItem, name: string) => {
    try {
      await RNFS.copyFile(
        selectedFile.path,
        `${selectedFile.path.substring(0, selectedFile.path.lastIndexOf("/"))}/${name}`
      );
      await RNFS.unlink(selectedFile.path);
    } catch (e) {
      console.log(e);
    }
  },

  shareFiles: (selectedFiles: RNFS.ReadDirItem[]) => {
    let urls: string[] = [];
    selectedFiles.map((e) => {
      urls.push(e.path);
    });
    Share.open({ urls: urls });
  },
}));
