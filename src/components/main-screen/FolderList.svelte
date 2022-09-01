<script lang="ts">
  import { folder } from "svelte-awesome/icons";
  import { settingState } from "../../stores/settings";
  import { basename } from "../../util/path";
  import Icon from "svelte-awesome";
  import Keybinding from "./Keybinding.svelte";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";

  export let folderShow: boolean;
  export let div: HTMLElement;
  export let folderVisible: Writable<boolean[]> = writable<boolean[]>([]);

  onMount(() => {
    folderVisible.set(new Array<boolean>($settingState.otherFolders.length));
  });
</script>

<div
  class={`grid grid-cols-5 w-full absolute px-10 pb-10 transition-all ${
    folderShow ? "bottom-0" : "-bottom-1/2"
  }`}
  bind:this={div}
>
  {#each $settingState.otherFolders as item, i}
    {#await basename(item) then path}
      <div
        class="cursor-pointer flex flex-col place-items-center \
               place-content-center hover:bg-slate-100 rounded-lg py-3"
        class:bg-slate-100={$folderVisible[i]}
      >
        <div
          class="rounded-full h-14 w-14 bg-slate-300 flex place-content-center \
                 place-items-center relative"
        >
          <Icon data={folder} scale={2} />
          <Keybinding positioning="left-0 -top-2" circled={false}>
            {i + 1}
          </Keybinding>
        </div>
        {path}
      </div>
    {/await}
  {/each}
</div>
