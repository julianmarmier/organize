<script lang="ts">
  import Icon from "svelte-awesome";
  import { folder, close } from "svelte-awesome/icons";
  import type { Writable } from "svelte/store";
  import Keybinding from "./Keybinding.svelte";

  export let div: HTMLElement;
  export let active: Writable<boolean>;
  export let folderShow: boolean;
</script>

<div
  on:click
  class={`bg-slate-300 px-10 transition-all hover:scale-125 \ 
          fixed cursor-pointer origin-center \
          ${
            $active
              ? "flex place-items-center place-content-center px-3 bottom-5 rounded-full h-16 w-16"
              : "rounded-t-full pt-4 pb-2 bottom-0"
          }
            ${folderShow ? "bottom-2/3" : ""}
          `}
  bind:this={div}
>
  <Icon scale={2} data={folderShow ? close : folder} />
  <Keybinding positioning="-top-3">{folderShow ? "↑" : "↓"}</Keybinding>
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
