# Organize

Organize your files, efficiently. Built on [Tauri](https://tauri.app) and [Svelte](https://svelte.dev).

## Installation

All binaries can be found on the [releases](https://github.com/julianmarmier/organize/releases) page.

### macOS
Download the `dmg` for your [appropriate architecture](https://support.apple.com/en-us/HT211814) (aarch64 for Apple Silicon, amd64 for Intel) and install the app as you would any other. If you cannot open it because of security settings, go to **System Preferences > Security > Open Anyway**.

### Windows

I do not have access to a Windows machine and therefore you will need to build from source. To do that, install [Git for Windows](https://gitforwindows.org/), [Node.js LTS](https://nodejs.org/en/download/), and [Tauri](https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-windows).

I also recommend using `pnpm` as your node package manager. Installation instructions [here](https://pnpm.io/installation).

Now that that's all set, you can finally clone the repo and build the project !

```bash
git clone https://github.com/julianmarmier/organize
pnpm run tauri build
```

### Linux

Unfortunately, Tauri only exports `AppImage` and `deb` packages. You can use an `AppImage` pretty much anywhere, and I've provided a deptapped `pkg.tar.zst` for Arch. If none of those work, you can build from source as described in the [Windows](#Windows) section.
