<script lang="ts">
  import { chooseHomeFolder } from "../stores/settings";
  import { fly } from "svelte/transition";

  import Button from "../components/Button.svelte";
  export let continueFunction: () => void;
</script>

<div class="flex h-full place-content-center items-center " out:fly={{ x: -200, duration: 500}}>
  <div
    class="flex flex-col items-center bg-slate-50 px-20 py-10 rounded-2xl drop-shadow-md"
  >
    <h1
      class="bg-clip-text text-transparent font-semibold text-6xl py-5 bg-gradient-to-tr from-fuchsia-500 via-blue-400 to-green-300 "
      in:fly={{ y: 20, duration: 2000}}
    >
      Organize
    </h1>
    <h2 class="pb-1 font-light">Take the trash out like a boss.</h2>
    <Button on:click={() => chooseHomeFolder().then(res => res && continueFunction())}>Choose a folder</Button>
  </div>
</div>