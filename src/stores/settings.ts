import { Store } from "tauri-plugin-store-api";
import { dialog } from "@tauri-apps/api";
import { Settings } from "./definitions";

import { writable } from "svelte/store";

/**
 * Making the settings stateful so that Svelte
 * can correctly interpret them.
 */
type SettingsState = {
  [Settings.HOME_FOLDER]: string;
  [Settings.OTHER_FOLDERS]: string[];
};

const store = new Store("settings.dat");

const { subscribe: stateSubscribe, update: stateUpdate } =
  writable<SettingsState>({
    homeFolder: "",
    otherFolders: [],
  });

export const settingState = { subscribe: stateSubscribe };

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
 * Requests the main folder from the user and sets it.
 * @returns true if the folder was successfully changed, false otherwise.
 */
const chooseHomeFolder = async () => {
  const chosenPath = (await dialog.open({
    directory: true,
    multiple: false,
  })) as string;

  if (chosenPath) {
    await setHomeFolder(chosenPath);
    return true;
  }

  return false;
};

export {
  getHomeFolder,
  setHomeFolder,
  getOtherFolders,
  setOtherFolders,
  chooseHomeFolder,
};
