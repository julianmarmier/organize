#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_store::PluginBuilder;
use tauri_plugin_fs_extra::FsExtra;
use open;

#[tauri::command]
fn open_path(path: String) -> bool {
    return open::that(path).is_ok().into()
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        .plugin(FsExtra::default())
        .invoke_handler(tauri::generate_handler![open_path])
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .run(context)
        .expect("error while running tauri application");
}
