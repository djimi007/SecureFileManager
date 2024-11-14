import { create } from "zustand";

import Share from "react-native-share";
import { Image } from "expo-image";

import { ReactNativeBlobUtilStat } from "react-native-blob-util";
import { fs, initialPath, media } from "../utils/constant";
import { CameraCapturedPicture } from "expo-camera";
import { ToastAndroid } from "react-native";

type FileFetchProp = {
  folders: ReactNativeBlobUtilStat[];
  images: ReactNativeBlobUtilStat[];
  dirLength: number;
  notify: boolean;
  foldersLength: number;
  imagesLength: number;
  selectedFolders: ReactNativeBlobUtilStat[];
  selectedImages: ReactNativeBlobUtilStat[];
  addToSelectedImages: (selectedFile: ReactNativeBlobUtilStat) => void;
  addToSelectedFolders: (selectedFile: ReactNativeBlobUtilStat) => void;
  getDir: (path: string) => Promise<void>;
  getImage: (path: string | string[]) => ReactNativeBlobUtilStat;
  getItemIndex: (item: ReactNativeBlobUtilStat) => number;

  createImageFile: (path: string, photo: CameraCapturedPicture | undefined) => Promise<void>;
  createFolder: (folderName: string, path: string) => Promise<void>;
  deleteFiles: (selectedFiles: ReactNativeBlobUtilStat[]) => Promise<void>;
  editFile: (selectedFile: ReactNativeBlobUtilStat, name: string) => Promise<void>;
  shareFiles: (selectedFiles: ReactNativeBlobUtilStat[]) => void;
};

export const useFileFetch = create<FileFetchProp>((set, get) => ({
  folders: [],
  images: [],
  dirLength: 0,
  notify: false,
  foldersLength: 0,
  imagesLength: 0,
  selectedFolders: [],
  selectedImages: [],
  containedPhotoInEachPath: {
    initialPath: 0,
  },
  getItemIndex: (item: ReactNativeBlobUtilStat) =>
    get().images.findIndex((image) => image.path === item.path),
  getImage: (path: string | string[]) => get().images.filter((e) => e.path === path)[0],

  addToSelectedFolders: (selectedFile: ReactNativeBlobUtilStat) =>
    set((state) => ({ selectedFolders: [...state.selectedFolders, selectedFile] })),
  addToSelectedImages: (selectedFile: ReactNativeBlobUtilStat) =>
    set((state) => ({ selectedImages: [...state.selectedImages, selectedFile] })),

  getDir: async (path: string) => {
    if (path === initialPath && !(await fs.exists(path))) fs.mkdir(initialPath);

    try {
      const result = await fs.lstat(path);
      const images = result.filter((e) => e.type === "file");
      const folders = result.filter((e) => e.type === "directory");
      set({
        images: images,
        folders: folders,
        imagesLength: images.length,
        foldersLength: folders.length,
        dirLength: result.length,
      });

      if (images) {
        let urls = images.map((e) => e.path);
        await Image.prefetch(urls);
      }
    } catch (error) {
      console.log("error : djimi : ", error);
    }
  },

  createImageFile: async (path: string, photo: CameraCapturedPicture | undefined) => {
    if (!photo) {
      ToastAndroid.show("Please Try Again", ToastAndroid.SHORT);
      return;
    }
    const imageLength = get().images.length;

    const parentFolder = path.split("/").pop();
    const imageName = parentFolder
      ? `${parentFolder}${imageLength > 0 ? `_${imageLength}` : ""}`
      : undefined;

    try {
      await media.writeToMediafile(`file://${path}/${imageName}.png`, photo!.uri);
      console.log(`file://${path}/${imageName}.png`);
      set((state) => ({ notify: !state.notify }));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  },

  createFolder: async (folderName: string, path: string) => {
    try {
      await fs.mkdir(`${path}/${folderName}`);
      set((state) => ({ notify: !state.notify }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteFiles: async (selectedFiles: ReactNativeBlobUtilStat[]) => {
    selectedFiles.forEach((element) => {
      fs.unlink(element.path).catch((e) => {
        console.log(e);
      });
    });
    set((state) => ({ notify: !state.notify }));
  },
  editFile: async (selectedFile: ReactNativeBlobUtilStat, name: string) => {
    try {
      await fs.cp(
        selectedFile.path,
        `${selectedFile.path.substring(0, selectedFile.path.lastIndexOf("/"))}/${name}`
      );
      await fs.unlink(selectedFile.path);
    } catch (e) {
      console.log(e);
    }
    set((state) => ({ notify: !state.notify }));
  },

  shareFiles: (selectedFiles: ReactNativeBlobUtilStat[]) => {
    let urls: string[] = [];
    selectedFiles.map((e) => {
      urls.push(e.path);
    });
    Share.open({ urls: urls });
  },
}));
