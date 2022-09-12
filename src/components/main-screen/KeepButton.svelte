<script lang="ts">
  import Icon from "svelte-awesome";
  import { check } from "svelte-awesome/icons";
  import type { Writable } from "svelte/store";
  import Keybinding from "./Keybinding.svelte";

  export let div: HTMLElement;
  export let active: Writable<boolean>;
  export let folderShow: boolean;
</script>

<div
  bind:this={div}
  on:click
  class={`bg-green-600 text-white absolute \
   cursor-pointer py-8 transition-all origin-right \
   ${
     $active
       ? "px-4 flex place-items-center place-content-center w-16 h-16 rounded-full -translate-x-5"
       : "rounded-l-full hover:scale-125 pl-3 pr-1"
   }`}

   class:translate-x-20={folderShow}
>
  <Icon scale={2} data={check} />
  <Keybinding positioning="-bottom-3 right-2">→</Keybinding>
</div>
