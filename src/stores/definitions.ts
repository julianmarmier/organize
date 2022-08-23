/**
 * App state enumeration
 */
export enum AppState {
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
}