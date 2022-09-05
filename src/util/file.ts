/**
 * File system operations for keeping, deleting and moving files
 */

import * as fs from "@tauri-apps/api/fs";
import { metadata } from "tauri-plugin-fs-extra-api";
import { formatBytes } from "./bytes";
import { resolveToHome } from "./path";

export const readDir = async (path: string) =>
  fs.readDir(await resolveToHome(path), {
    dir: fs.BaseDirectory.Home,
  });

export const removeFile = async (path: string) =>
  fs.removeFile(path, {
    dir: fs.BaseDirectory.Home,
  });

export const moveFile = async (path: string, newPath: string) =>
  fs.renameFile(path, newPath, {
    dir: fs.BaseDirectory.Home,
  });

export const getFileInfo = async (path: string): Promise<FileInfo> => {
  const metad = await metadata(path);
  return {
    formattedSize: formatBytes(metad.size),
    dateAccessed: metad.accessedAt,
  };
};

export type FileInfo = {
  /** The size of the file formatted respective to the number of bytes. */
  formattedSize: string;
  /** The last date the file was accessed. This may not be exactly what the user wants however. */
  dateAccessed: Date;
};
