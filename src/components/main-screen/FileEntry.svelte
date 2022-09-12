<script lang="ts">
  import type { Spring } from "svelte/motion";
  import fileElementsList from "file-icon-vectors/dist/icons/square-o/catalog.json";
  import { openPath } from "../../util/file";

  export let coords: Spring<{ x: number; y: number }>;
  export let dragging = false;
  export let div: HTMLElement;

  export let path: string;
  export let ext: string;

  $: iconExt = fileElementsList.includes(ext) ? ext : "txt";
  
</script>

<div
  class="shadow-md bg-slate-50 shadow-slate-300 rounded-xl select-none cursor-grab relative active:cursor-grabbing z-10 overflow-hidden w-40"
  style={`bottom: ${$coords.y}px; right: ${$coords.x}px`}
  on:mousedown|preventDefault={() => {
    dragging = true;
  }}
  bind:this={div}
>
  <p
    class="rounded-full shadow-md bg-slate-50 absolute z-10 left-3 top-3 px-3 py-1 text-center"
  >
    {ext.toUpperCase()}
  </p>
  <div
    class="bg-slate-300 flex place-items-center place-content-center py-4 w-full"
  >
    <span class="fiv-sqo fiv-icon-{iconExt} fiv-size-xl" />
  </div>
  <div class="px-3 py-2">
    <p class="font-semibold ">
      <slot name="name" />
    </p>
    <slot name="size" />
    <button
      class="mt-2 text-center w-full rounded-full bg-slate-300"
      on:click={() => openPath(path)}>Open</button
    >
  </div>
</div>