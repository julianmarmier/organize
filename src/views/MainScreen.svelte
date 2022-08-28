<script lang="ts">
  import Keybinding from "../components/Keybinding.svelte";
  import Icon from "svelte-awesome";
  import { check, folder, trash } from "svelte-awesome/icons";

    import { slide } from "svelte/transition"
</script>

<div
  class="w-full h-full bg-white grid grid-cols-[min-content_1fr_min-content] grid-rows-[1fr_min-content]"
  transition:slide
>
  <div class="flex items-center">
    <div class="bg-red-500 text-white pl-2 pr-4 py-8 rounded-r-full relative">
      <Icon scale={2} data={trash} />
      <Keybinding positioning="-bottom-3">←</Keybinding>
    </div>
  </div>
  <div class="flex place-items-center place-content-center">
    <div class="shadow-md bg-slate-50 shadow-slate-300 rounded-lg px-10 py-4">
      File
    </div>
  </div>
  <div class="flex place-items-center place-content-end">
    <div class="bg-green-600 text-white pl-3 pr-1 py-8 rounded-l-full relative">
      <Icon scale={2} data={check} />
      <Keybinding positioning="-bottom-3 right-2">→</Keybinding>
    </div>
  </div>
  <div />
  <div class="flex place-items-end place-content-center relative">
    <div class="bg-slate-300 rounded-t-full px-10 pt-4 pb-2">
      <Icon scale={2} data={folder} />
    </div>
    <Keybinding positioning="-top-3">↓</Keybinding>
  </div>
  <div />
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
