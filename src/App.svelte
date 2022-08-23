<script lang="ts">
  import ControlButton from './components/ControlButton.svelte';

  import Intro from './views/Intro.svelte';
  import FolderSelect from './views/FolderSelect.svelte';
  import MainScreen from './views/MainScreen.svelte';

  import { AppState } from "./stores/definitions"
  import { state } from "./stores/appState"
</script>

<body class="h-screen flex flex-col justify-items-stretch overflow-hidden">
  <div data-tauri-drag-region class="p-2 top-0 flex items-center bg-slate-400">
    <ControlButton color="red"/>
    <ControlButton color="yellow"/>
    <ControlButton color="green"/>
  </div>
  
  <main class="bg-slate-200 rounded-b-lg h-full">
    {#if $state == AppState.INTRO}
    <Intro continueFunction={() => state.nextState()}/>
    {/if}
    {#if $state == AppState.SELECT_FOLDERS}
    <FolderSelect />
    {/if}
    {#if $state == AppState.MAIN}
    <MainScreen/>
    {/if}
  </main>
</body>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
