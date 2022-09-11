<script lang="ts">
  import type { Spring } from "svelte/motion";
  import fileElementsList from "file-icon-vectors/dist/icons/square-o/catalog.json";
import { invoke } from "@tauri-apps/api/tauri";

  export let coords: Spring<{x: number, y: number}>;
  export let dragging = false;
  export let div: HTMLElement;

  export let path: string;
  export let ext: string;

  $: iconExt = fileElementsList.includes(ext) ? ext : "txt"

  const openPath = async () => {
    const res = await invoke("open_path", {
      path: path
    })

    console.log(res);
  }
</script>

<div
  class="shadow-md bg-slate-50 shadow-slate-300 rounded-lg px-10 py-4 select-none cursor-grab relative active:cursor-grabbing z-10"
  style={`bottom: ${$coords.y}px; right: ${$coords.x}px`}
  on:mousedown|preventDefault="{() => {dragging = true}}"
  bind:this={div}
>
  <p>{ext.toUpperCase()}</p>
  <span class="fiv-sqo fiv-icon-{iconExt} fiv-size-lg"></span>
  <slot name="name"></slot>
  <slot name="size"></slot>
  <button on:click="{openPath}">Open</button>
</div>
