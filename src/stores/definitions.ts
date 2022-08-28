/**
 * App state enumeration
 */
export enum AppState {
    OFF="off",
    INTRO="intro",
    SELECT_FOLDERS="folderSelection",
    SETTINGS="settings",
    MAIN="main"
}

/**
 * The setting keys that are used by the local store.
 */
export enum Settings {
    HOME_FOLDER="homeFolder",
    OTHER_FOLDERS="otherFolders",
    INTRO_FINISHED="introFinished",
    SELECT_FINISHED="selectFinished"
}

/**
 * Making the settings stateful so that Svelte
 * can correctly interpret them.
 */
 export type SettingsState = {
    [Settings.HOME_FOLDER]: string;
    [Settings.OTHER_FOLDERS]: string[];
    [Settings.INTRO_FINISHED]: boolean;
    [Settings.SELECT_FINISHED]: boolean;
  };
  