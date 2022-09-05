<script lang="ts">
  import { spring } from "svelte/motion";
  import { slide } from "svelte/transition";

  import FileEntry from "../components/main-screen/FileEntry.svelte";

  import FolderButton from "../components/main-screen/FolderButton.svelte";
  import KeepButton from "../components/main-screen/KeepButton.svelte";
  import TrashButton from "../components/main-screen/TrashButton.svelte";

  import { writable, type Writable } from "svelte/store";
  import FolderList from "../components/main-screen/FolderList.svelte";

  import { Key } from "../util/Key";
  import { areaOccupiedFraction, checkIntersection } from "../util/rect";
  import { onMount } from "svelte";
import { settingState } from "../stores/settings";
import { resolveToHome } from "../util/path";

  onMount(() => {
    resolveToHome($settingState.homeFolder)
  })

  let file: HTMLElement;
  let folderShow: boolean = false;
  let folderList: HTMLElement;
  let folderVisible: Writable<boolean[]>;
  let folderCurrentSelected: number;

  interface Action {
    div?: HTMLElement;
    active?: Writable<boolean>;
    interact: () => void;
  }

  const elements: {
    trash: Action;
    folders: Action;
    keep: Action;
  } = {
    trash: {
      active: writable(false),
      interact: () => {},
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
      interact: () => {},
    },
  };

  let dragging = false;
  let coords = spring(
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
    
    if (folderCurrentSelected || folderCurrentSelected == 0 && folderShow) {
      const currentFolder = folderList.children[folderCurrentSelected];

      if (checkIntersection(currentFolder, file)) {
        // interact with index folderCurrentSelected

      }
    }
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    switch (e.code) {
      case Key.ArrowLeft:
        // toggle trash
        break;
      case Key.ArrowRight:
        // toggle check
        break;
      case Key.ArrowDown:
        // toggle trash
        break;
    }
  };

  const handleDrag = (e: MouseEvent) => {
    if (!dragging) return;

    coords.update((old) => ({
      x: old.x - e.movementX,
      y: old.y - e.movementY,
    }));

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
          const intersecting =
            checkIntersection(current, file) &&
            areaOccupiedFraction(file, current) >=
              areaOccupiedFraction(
                file,
                folderList.children[folderCurrentSelected ?? i]
              );
          bef[i] = intersecting;
          if (intersecting) folderCurrentSelected = i;
          return bef;
        });
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeyboard} />
<div
  class="w-full h-full overflow-hidden relative"
  class:cursor-grabbing={dragging}
  transition:slide
  on:mouseup={resetSpring}
  on:mouseleave={resetSpring}
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
        on:click={elements.trash.interact}
      />
    </div>

    <div class="flex place-items-center place-content-center relative">
      <FileEntry bind:div={file} bind:coords bind:dragging />
    </div>

    <div class="flex place-items-center place-content-end">
      <KeepButton
        bind:div={elements.keep.div}
        bind:active={elements.keep.active}
        bind:folderShow
        on:click={elements.keep.interact}
      />
    </div>
    <div />
    <div class="flex place-items-end place-content-center relative">
      <FolderButton
        bind:div={elements.folders.div}
        bind:active={elements.folders.active}
        bind:folderShow
        on:click={elements.folders.interact}
      />
    </div>
    <div />
  </div>
  <FolderList bind:folderShow bind:div={folderList} bind:folderVisible />
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
