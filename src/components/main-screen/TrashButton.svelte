<script lang="ts">
  import Icon from "svelte-awesome";
  import { trash } from "svelte-awesome/icons";
  import type { Writable } from "svelte/store";
  import Keybinding from "./Keybinding.svelte";

  export let active: Writable<boolean>;
  export let folderShow: boolean;
  export let div: HTMLElement;
</script>

<div
  on:click
  class={`bg-red-500 text-white py-8 cursor-pointer  \ 
          absolute z-10 transition-all origin-left flex place-content-center place-items-center \
           ${
             $active
               ? "flex place-items-center place-content-center translate-x-5 px-3 h-16 w-16 rounded-full"
               : "hover:scale-125 rounded-r-full pl-2 pr-4"
           }`}
  bind:this={div}
  class:-translate-x-20={folderShow}
>
  <Icon scale={2} data={trash} />
  <Keybinding positioning="-bottom-3">←</Keybinding>
</div>
