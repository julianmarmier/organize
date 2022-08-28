<script lang="ts">
  import ControlButton from "./components/ControlButton.svelte";

  import Intro from "./views/Intro.svelte";
  import FolderSelect from "./views/FolderSelect.svelte";
  import MainScreen from "./views/MainScreen.svelte";

  import { AppState } from "./stores/definitions";
  import { state as appState } from "./stores/appState";
  import { titleBar } from "./stores/titleBar";

  import { settingState } from "./stores/settings";
  import { onMount } from "svelte";

  const init = async () => {
    await settingState.init();
    if ($settingState.selectFinished) appState.nextState(AppState.MAIN);
    else if ($settingState.introFinished)
      appState.nextState(AppState.SELECT_FOLDERS);
    else appState.nextState(AppState.INTRO);
  };

  onMount(init);
</script>

<body class="h-screen flex flex-col justify-items-stretch overflow-hidden">
  <div data-tauri-drag-region class="p-2 top-0 grid grid-cols-3 bg-white w-full">
    <div data-tauri-drag-region class="flex place-items-center">
      <ControlButton color="red" />
      <ControlButton color="yellow" />
      <ControlButton color="green" />
    </div>
    <div data-tauri-drag-region class="flex place-content-center">
      <p class="text-slate-400">{$titleBar.firstHalf}</p>
      <p on:click={() => {
        if ($titleBar.clickable) 
          appState.nextState(AppState.SELECT_FOLDERS);
      }} class="hover:underline cursor-pointer">{$titleBar.secondHalf}</p>
    </div>
  </div>

  <main class="bg-slate-200 rounded-b-lg h-full">
    {#if $appState == AppState.INTRO}
      <Intro continueFunction={() => appState.nextState()} />
    {/if}
    {#if $appState == AppState.SELECT_FOLDERS}
      <FolderSelect />
    {/if}
    {#if $appState == AppState.MAIN}
      <MainScreen />
    {/if}
  </main>
</body>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
