<script>
  import { basename } from "../util/path";
  import FolderEntry from "../components/FolderEntry.svelte";
  import Button from "../components/Button.svelte";

  import { fly } from "svelte/transition";
  import {
    chooseHomeFolder,
    chooseOtherFolder,
    removeOtherFolder,
    settingState,
  } from "../stores/settings";

  import { Icon } from "svelte-awesome";
  import { folder } from "svelte-awesome/icons";

  import { derived } from "svelte/store";
  import { state } from "../stores/appState";

  const homeDirName = derived(settingState, ($s, set) => {
    basename($s.homeFolder).then((res) => set(res));
  });
</script>

<div class="flex h-full place-content-center items-center">
  <div
    class="flex flex-col items-center bg-slate-50 px-16 py-10 rounded-2xl drop-shadow-md space-y-2 w-full mx-24 max-h-almost-full"
    transition:fly={{ x: 200, duration: 500 }}
  >
    <div class="flex items-center">
      <Icon data={folder} />
      <h1 class="font-bold text-lg ml-1 mr-3">
        {$homeDirName}
      </h1>
      <h1
        class="cursor-pointer align-middle transition-colors text-slate-500 hover:text-red-500"
        on:click={chooseHomeFolder}
      >
        Change
      </h1>
    </div>
    <p class="pb-3">Choose folders to quickly move your files.</p>
    <ul class="w-full overflow-y-scroll">
      {#each $settingState.otherFolders as folder, i (folder)}
        <FolderEntry on:click={() => removeOtherFolder(folder)}>
          <span slot="icon">{i + 1}</span>
          <p slot="folder">
            {#await basename(folder) then res}
              {res}
            {/await}
          </p>
        </FolderEntry>
      {/each}

      {#if $settingState.otherFolders.length < 9}
      <FolderEntry isSpecial={true} on:click={chooseOtherFolder}>
        <span slot="icon">+</span>
        <p slot="folder">Add a folder…</p>
      </FolderEntry>
      {/if}
    </ul>

    <Button on:click={() => state.nextState()}>Continue</Button>
  </div>
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
