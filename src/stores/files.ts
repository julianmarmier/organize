import type { FileEntry } from "@tauri-apps/api/fs";
import { getFileInfo, readDir, type OrganizeFile } from "../util/file";
import { derived, writable } from "svelte/store";
import { getHomeFolder } from "./settings";

const { subscribe, update, set } = writable<FileEntry[]>([]);

const init = async () => {
  const mainFolder = await getHomeFolder();
  const files = await readDir(mainFolder);
  set(files.filter((entry) => !entry.children));
};

/**
 * Grabs the next available element from the list.
 */
const next = () => {
  let newItem: FileEntry;
  update((list) => {
    newItem = list.pop();
    return list;
  });
  return newItem;
};

export const fileList = {
  subscribe,
  init,
  next,
  update,
};

export const currentFile = derived<typeof fileList, OrganizeFile>(
  fileList,
  ($list, set) => {
    const len = $list.length;

    if (len > 0) {
      const file = $list[len - 1];
      getFileInfo(file.path).then(res =>
        set({
          ...file,
          ...res,
        })
      );
    }
  }
);
