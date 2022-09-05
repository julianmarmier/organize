// Local fork of Tauri's fs/dir API
// Copyright 2019-2022 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Types and functions related to file system directory management.

use serde::Serialize;
use std::{
  fs::{self, metadata},
  path::{Path, PathBuf},
};
use tempfile::{self, tempdir};

/// A disk entry which is either a file or a directory.
///
/// This is the result of the [`read_dir`]. The `children` field is always `Some` if the entry is a directory.
#[derive(Debug, Serialize)]
#[non_exhaustive]
pub struct DiskEntry {
  /// The path to the entry.
  pub path: PathBuf,
  /// The name of the entry (file name with extension or directory name).
  pub name: Option<String>,
  /// The children of this entry if it's a directory.
  #[serde(skip_serializing_if = "Option::is_none")]
  pub children: Option<Vec<DiskEntry>>,
}

/// Reads a directory. Can perform recursive operations.
pub fn read_dir<P: AsRef<Path>>(path: P) -> crate::api::Result<Vec<DiskEntry>> {
  let mut files_and_dirs: Vec<DiskEntry> = vec![];
  
  for entry in fs::read_dir(path)? {
    let path = entry?.path();
    let path_as_string = path.display().to_string();

    if let Ok(flag) = is_dir(&path_as_string) {
      files_and_dirs.push(DiskEntry {
        path: path.clone(),
        children: if flag {
          Some(if recursive {
            read_dir(&path_as_string, true)?
          } else {
            vec![]
          })
        } else {
          None
        },
        name: path
          .file_name()
          .map(|name| name.to_string_lossy())
          .map(|name| name.to_string()),
      });
    }
  }
  Result::Ok(files_and_dirs)
}