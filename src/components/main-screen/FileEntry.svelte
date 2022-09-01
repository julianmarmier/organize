<script lang="ts">
  import type { Spring } from "svelte/motion";

  export let coords: Spring<{x: number, y: number}>;
  export let dragging = false;
  export let div: HTMLElement;
</script>

<div
  class="shadow-md bg-slate-50 shadow-slate-300 rounded-lg px-10 py-4 select-none cursor-grab relative active:cursor-grabbing z-10"
  style={`bottom: ${$coords.y}px; right: ${$coords.x}px`}
  on:mousedown|preventDefault="{() => {dragging = true}}"
  bind:this={div}
>
  File
</div>
