import { create } from "zustand";

import Share from "react-native-share";
import { Image } from "expo-image";

import { ReactNativeBlobUtilStat } from "react-native-blob-util";
import { fs, initialPath, media } from "../utils/constant";
import { CameraCapturedPicture } from "expo-camera";
import { ToastAndroid } from "react-native";
import { usePath } from "./pathstate";



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
  deleteFiles: (selectedFilesPath:string | string[]) => Promise<void>;
  editFile: (selectedFilePath: string,parentPath: string | string[], name: string) => Promise<void>;
  shareFiles: (selectedFilesPath: string|string[]) => void;
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
  deleteFiles: async (selectedFilesPath: string | string[]) => {
   
    if( Array.isArray(selectedFilesPath)){
    selectedFilesPath.forEach((element) => {
      fs.unlink(element).catch((e) => {
        console.log(e);
      });
    })
   }
   else {
        try {
          await fs.unlink(selectedFilesPath);
        } catch (e) { 
          console.log(e);
        }

      } 
    set((state) => ({ notify: !state.notify }));
  },
  editFile: async (  selectedFilePath: string,parentPath : string | string[], name: string) => {

    console.log( selectedFilePath , '\n' , `file://${parentPath}/${name}.png`);
    
    try {
      await media.writeToMediafile(`file://${parentPath}/${name}.png`,selectedFilePath)
    
      await fs.unlink(selectedFilePath);
    } catch (e) {
      console.log(e);
    }


    set((state) => ({ notify: !state.notify }));
  },

  shareFiles: (selectedFilesPath:string | string[]) => {

    Array.isArray(selectedFilesPath) ? Share.open({ urls:selectedFilesPath }): Share.open({
      url: selectedFilesPath
    })
  },
}));
