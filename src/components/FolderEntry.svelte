<script lang="ts">
  import Icon from "svelte-awesome";
  import { slide } from "svelte/transition";
  import { trash } from "svelte-awesome/icons";

  export let isSpecial: boolean = false;
  let showTrash = false;

  const toggleTrash = (event?: Event, val?: boolean) =>
    (showTrash = val ?? !showTrash);
</script>

<li
  transition:slide|local
  on:click
  class:border-b={isSpecial}
  class="border-t flex items-center cursor-pointer transition-colors hover:bg-slate-200 py-3"
  on:mouseenter={toggleTrash}
  on:mouseleave={toggleTrash}
  on:focus={toggleTrash}
  on:blur={toggleTrash}
>
  <span
    class="bg-slate-300 w-5 h-5 rounded-full flex justify-center items-center mr-2 font-bold text-xs"
  >
    <slot name="icon" />
  </span>
  <div>
    <slot name="folder" />
  </div>
  {#if !isSpecial && showTrash}
    <Icon class="ml-2 text-red-500" data={trash} label="Click to Delete" />
  {/if}
</li>
