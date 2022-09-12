<script lang="ts">
  import { spring } from "svelte/motion";
  import { fly } from "svelte/transition";

  import FileEntry from "../components/main-screen/FileEntry.svelte";

  import Button from "../components/Button.svelte";
  import FolderButton from "../components/main-screen/FolderButton.svelte";
  import KeepButton from "../components/main-screen/KeepButton.svelte";
  import TrashButton from "../components/main-screen/TrashButton.svelte";

  import { writable, type Writable } from "svelte/store";
  import FolderList from "../components/main-screen/FolderList.svelte";

  import { Key } from "../util/Key";
  import { areaOccupiedFraction, checkIntersection } from "../util/rect";

  import { currentFile, fileList } from "../stores/files";

  import { state } from "../stores/appState";
  import { AppState } from "../stores/definitions";
  import { settingState } from "../stores/settings";
  import { titleBar } from "../stores/titleBar";
  import coordinate, { type Coordinates } from "../util/coordinates";
  import { moveFileToFolder, openPath, removeFile } from "../util/file";

  let file: HTMLElement;
  let folderShow: boolean = false;
  let folderList: HTMLElement;
  let folderVisible: Writable<boolean[]>;
  let folderCurrentSelected: number;

  interface Action {
    div?: HTMLElement;
    active?: Writable<boolean>;
    interact: (animate?: boolean) => void;
  }

  const ANIMATION_INTERVAL = 400;

  const handleAnimation = (active: Writable<boolean>, animate?: boolean) => {
    if (animate) {
      active.set(true);
      setTimeout(() => {
        active.set(false);
      }, ANIMATION_INTERVAL);
    } else {
      active.set(false);
    }
  };

  const elements: {
    trash: Action;
    folders: Action;
    keep: Action;
  } = {
    trash: {
      active: writable(false),
      interact: (animate?) => {
        removeFile($currentFile.path).then(() => {
          fileList.next();
          handleAnimation(elements.trash.active, animate);
        });
      },
    },
    folders: {
      active: writable(false),
      interact: () => {
        folderShow = !folderShow;
        elements.folders.active.set(folderShow);
      },
    },
    keep: {
      active: writable(false),
      interact: (animate?) => {
        fileList.next();
        handleAnimation(elements.keep.active, animate);
      },
    },
  };

  let dragging = false;
  let coords = spring<Coordinates>(
    { x: 0, y: 0 },
    {
      stiffness: 0.1,
      damping: 0.5,
    }
  );

  const resetSpring = () => {
    dragging = false;
    coords.set(
      { x: 0, y: 0 },
      {
        soft: 1,
      }
    );

    // Check if interaction is needed
    for (const element of Object.values(elements)) {
      if (checkIntersection(element.div, file)) element.interact();
    }

    if (folderCurrentSelected || (folderCurrentSelected == 0 && folderShow)) {
      const currentFolderElement = folderList.children[folderCurrentSelected];

      if (checkIntersection(currentFolderElement, file)) {
        // interact with index folderCurrentSelected
        interactWithFolder(folderCurrentSelected);
      }
    }
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    switch (e.code) {
      case Key.ArrowLeft:
        // toggle trash
        e.preventDefault();
        elements.trash.interact(true);
        break;
      case Key.ArrowRight:
        // toggle check
        elements.keep.interact(true);
        e.preventDefault();
        break;
      case Key.ArrowDown:
        // toggle folders
        elements.folders.interact(true);
        e.preventDefault();
        break;
    }

    switch (e.key) {
      case "o":
        openPath($currentFile.path);
        e.preventDefault();
        break;
    }

    // Check if a folder key was pressed
    if (
      folderShow &&
      "1" <= e.key &&
      e.key <= $settingState.otherFolders.length.toString()
    ) {
      interactWithFolder(Number(e.key) - 1);
      e.preventDefault();
    }
  };

  let initialClick: Coordinates;

  const handleWindowClick = (e: MouseEvent) => {
    initialClick = {
      x: e.screenX,
      y: e.screenY,
    };
  };

  const handleDrag = (e: MouseEvent) => {
    if (!dragging) return;

    const clickLocation = {
      x: e.screenX,
      y: e.screenY,
    };

    coords.set(coordinate.difference(clickLocation, initialClick));

    // Check if file is within element bounds
    for (const [key, element] of Object.entries(elements)) {
      element.active.set(
        checkIntersection(element.div, file) || (folderShow && key == "folders")
      );
    }

    // Check if file is intersecting with a list element
    if (folderShow) {
      for (let i = 0; i < folderList.children.length; i++) {
        // then tell FolderList to interact with item i.
        const current = folderList.children[i];

        folderVisible.update((bef) => {
          let coversMost;

          if (folderCurrentSelected || folderCurrentSelected == 0) {
            coversMost =
              folderCurrentSelected == i
                ? true
                : areaOccupiedFraction(file, current) >
                  areaOccupiedFraction(
                    file,
                    folderList.children[folderCurrentSelected]
                  );
          } else {
            coversMost = true;
          }

          const intersecting = coversMost && checkIntersection(current, file);
          bef[i] = intersecting;
          if (intersecting) folderCurrentSelected = i;
          return bef;
        });
      }
    }
  };

  const interactWithFolder = (i: number) => {
    const folderPath = $settingState.otherFolders[i];
    moveFileToFolder($currentFile.path, folderPath);
    folderShow = false;
    fileList.next();
    elements.folders.active.set(false);
  };
</script>

<svelte:window on:keydown={handleKeyboard} />
<div
  class="w-full h-full overflow-hidden relative"
  class:cursor-grabbing={dragging}
  transition:fly={{ y: 50 }}
  on:mouseup={resetSpring}
  on:mouseleave={resetSpring}
  on:mousedown={handleWindowClick}
  on:mousemove={handleDrag}
>
  <div
    class="w-full h-full bg-white grid grid-cols-[min-content_1fr_min-content] grid-rows-[1fr_min-content] select-none"
  >
    <div class="flex items-center">
      <TrashButton
        bind:div={elements.trash.div}
        bind:active={elements.trash.active}
        bind:folderShow
        on:click={() => elements.trash.interact(true)}
      />
    </div>

    {#await fileList.init() then _}
      <div class="flex place-items-center place-content-center relative">
        {#if $currentFile}
          <FileEntry
            bind:div={file}
            bind:coords
            bind:dragging
            bind:ext={$currentFile.ext}
            path={$currentFile.path}
          >
            <p slot="name">{$currentFile.name}</p>
            <p slot="size">{$currentFile.formattedSize}</p>
          </FileEntry>
        {/if}
        {#if !$currentFile}
          <div
            class="flex flex-col w-3/4 p-5 bg-slate-100 place-items-center justify-items-center space-y-4 rounded-xl shadow-lg"
          >
            <h1 class="font-semibold text-xl">That's it!</h1>
            <p>
              You finished sorting all of the files in <b>{$titleBar.secondHalf}</b>.
            </p>
            <p>
              <Button on:click={() => state.nextState(AppState.SELECT_FOLDERS)}
                >Choose another folder</Button
              >
              <Button on:click={fileList.init}>Start again</Button>
            </p>
          </div>
        {/if}
      </div>
    {/await}

    <div class="flex place-items-center place-content-end">
      <KeepButton
        bind:div={elements.keep.div}
        bind:active={elements.keep.active}
        bind:folderShow
        on:click={() => elements.keep.interact(true)}
      />
    </div>
    <div />
    <div class="flex place-items-end place-content-center relative">
      <FolderButton
        bind:div={elements.folders.div}
        bind:active={elements.folders.active}
        bind:folderShow
        on:click={() => elements.folders.interact()}
      />
    </div>
    <div />
  </div>
  <FolderList
    bind:folderShow
    bind:div={folderList}
    bind:folderVisible
    interact={interactWithFolder}
  />
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
