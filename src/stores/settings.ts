import { Store } from "tauri-plugin-store-api";
import { dialog } from "@tauri-apps/api";
import { Settings } from "./definitions";
import type { SettingsState } from "./definitions";

import { writable } from "svelte/store";
import { homeDir } from "@tauri-apps/api/path";
import { checkValidPath } from "../util/path";

const MAX_FOLDER_NO = 9;
const store = new Store("settings.dat");

const {
  subscribe: stateSubscribe,
  update: stateUpdate,
  set: stateSet,
} = writable<SettingsState>({
  homeFolder: "",
  otherFolders: [],
  introFinished: false,
  selectFinished: false,
});

const stateInit = async () => {
  stateSet({
    homeFolder: (await getHomeFolder()) ?? "",
    otherFolders: (await getOtherFolders()) ?? [],
    introFinished: (await getUserPref(Settings.INTRO_FINISHED)) ?? false,
    selectFinished: (await getUserPref(Settings.SELECT_FINISHED)) ?? false,
  });
};

export const settingState = { init: stateInit, subscribe: stateSubscribe };

/**
 * Gets the given setting from the computer store.
 * @param key A setting key to get
 * @returns A promise resolving to the corresponding key
 * @see Settings
 */
const getUserPref = <T>(key: Settings): Promise<T> => store.get(key);

/**
 * Sets the given setting in the computer store and
 * respectively updates the application state.
 * @param key The setting key to store to
 * @param value The value to associate to the given key
 * @returns A void promise to indicate completion
 * @see {@link Settings}
 */
const setUserPref = <T>(key: Settings, value: T) => {
  stateUpdate((prevState) => ({ ...prevState, [key]: value }));
  return store.set(key, value);
};

/**
 * Gets the main folder to be sorted.
 * @returns A promise resolving to the home folder.
 */
const getHomeFolder = () => getUserPref<string>(Settings.HOME_FOLDER);

/**
 * Sets the main folder to be sorted.
 * @returns A void promise to indicate completion.
 */
const setHomeFolder = (dir: string) => setUserPref(Settings.HOME_FOLDER, dir);

/**
 * Gets the folders in which files will placed.
 * @returns A promise resolving to the list of folders.
 */
const getOtherFolders = () => getUserPref<string[]>(Settings.OTHER_FOLDERS);

/**
 * Sets the list of folders in which the files will be placed.
 * @param dirList The list of folders.
 * @returns A void promise to indicate completion.
 */
const setOtherFolders = (dirList: string[]) =>
  setUserPref(Settings.OTHER_FOLDERS, dirList);

/**
 * Sets whether or not the introduction phase has been finished.
 * @param val The value to set
 * @returns A void promise to indicate completion.
 */
const setIntroFinished = (val: boolean) =>
  setUserPref(Settings.INTRO_FINISHED, val);

/**
 * Sets whether or not the folder selection phase has been finished.
 * @param val The value to set
 * @returns A void promise to indicate completion.
 */
const setSelectFinished = (val: boolean) =>
  setUserPref(Settings.SELECT_FINISHED, val);

/**
 * Requests one (or more) folders from the user.
 * @param callback Function to call once the folder has been selected.
 * @param multiple Whether or not to allow multiple folders to be selected.
 * @returns true if the user has successfully selected a folder, false otherwise.
 */
const chooseFolder = async (
  callback: (...paths: string[]) => Promise<void>,
  multiple?: boolean
) => {
  const chosenPath = await dialog.open({
    directory: true,
    defaultPath: (await getHomeFolder()) ?? (await homeDir()),
    multiple: multiple ?? false,
  });

  if (chosenPath) {
    const normalized = Array.isArray(chosenPath) ? chosenPath : [chosenPath];

    for (const path of normalized) {
      if (!(await checkValidPath(path))) {
        alert("Please select a subfolder of " + (await homeDir()));
        return;
      }
    }

    await callback(...normalized);
    return true;
  }

  return false;
};

/**
 * Requests the main folder from the user and sets it.
 * @returns true if the folder was successfully changed, false otherwise.
 */
const chooseHomeFolder = async () =>
  chooseFolder((...paths: string[]) => {
    // TODO check if there is a better way to handle the string - array conversion
    return setHomeFolder(paths[0]);
  }, false);

/**
 * Requests a folder from the user and sets it.
 * @returns true if the folder was successfully added, false otherwise.
 */
const chooseOtherFolder = async () =>
  chooseFolder(async (...paths: string[]) => {
    const folderList = (await getOtherFolders()) ?? [];

    for (const path of paths) {
      if (!folderList.includes(path) && folderList.length < MAX_FOLDER_NO)
        folderList.push(path);
    }

    return setOtherFolders(folderList);
  }, true);

/**
 * Removes the given folder from the file list, provided it exists in the list.
 * @param path The folder to remove. If it is not in the list, no change will be made.
 */
const removeOtherFolder = async (path: string) => {
  const folderList = await getOtherFolders();

  if (!folderList.includes(path)) {
    return;
  }

  const newList = folderList.filter((f) => f != path);
  return setOtherFolders(newList);
};

export {
  getHomeFolder,
  setHomeFolder,
  getOtherFolders,
  setOtherFolders,
  setIntroFinished,
  setSelectFinished,
  chooseHomeFolder,
  chooseOtherFolder,
  removeOtherFolder,
};
