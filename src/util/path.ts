/**
 * Tauri `path` API decorated with anti-falsy logic for app-specific needs.
 */
import {
  BaseDirectory,
  basename as bn,
  dirname as dn,
  homeDir,
} from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api";

/**
 * Returns the last portion of a `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { basename, resolveResource } from '@tauri-apps/api/path';
 * const resourcePath = await resolveResource('app.conf');
 * const base = await basename(resourcePath);
 * assert(base === 'app');
 * ```
 *
 * @param ext An optional file extension to be removed from the returned path.
 */
export const basename = async (path: string, ext?: string) => {
  if (path == "/") {
    return "(root)";
  }

  const base = await bn(path, ext);
  return base ?? "";
};

/**
 * Returns the directory name of a `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { dirname, appDir } from '@tauri-apps/api/path';
 * const appDirPath = await appDir();
 * const dir = await dirname(appDirPath);
 * ```
 */
export const dirname = async (path: string) => {
  const dir = await dn(path);
  return dir ?? "";
};

/**
 * Check if the given path is indeed included within the home directory.
 * If not, a good idea would be to prompt the user to choose again.
 */
export const checkValidPath = async (path: string) =>
  path.includes(await homeDir());

/**
 * Returns the given path relative to the user's $HOME folder.
 * Implementation may change if this does not suffice.
 */
export const resolveToHome = async (path?: string) => {
  console.log(await homeDir());
  
  if (!(await checkValidPath(path))) throw new Error("Path is not valid !");
  return path.substring((await homeDir()).length);
};
