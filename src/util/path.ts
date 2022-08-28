/**
 * Tauri `path` API decorated with anti-falsy logic for app-specific needs.
 */
import { basename as bn, dirname as dn } from "@tauri-apps/api/path";

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
    return "(root)"
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
