<script>
  import { basename } from "@tauri-apps/api/path";
  import FolderEntry from "../components/FolderEntry.svelte";

  import { fly } from "svelte/transition";
  import { chooseHomeFolder, settingState } from "../stores/settings";

  import { Icon } from "svelte-awesome";
  import { folder } from "svelte-awesome/icons";

  import { derived } from "svelte/store";
  const homeDirName = derived(settingState, ($s, set) => {
    basename($s.homeFolder).then(res => set(res))
  })
</script>

<div class="flex h-full place-content-center items-center">
  <div
    class="flex flex-col items-center bg-slate-50 px-20 py-10 rounded-2xl drop-shadow-md space-y-2"
    in:fly={{ x: 200, duration: 500 }}
  >
    <div class="flex items-center">
        <Icon data={folder}/>
        <h1 class="font-bold text-lg ml-1 mr-3">
          {$homeDirName}
        </h1>
        <h1 class="cursor-pointer align-middle transition-colors text-slate-500 hover:text-red-500" on:click={chooseHomeFolder}>Change</h1>
    </div>
    <p>Choose folders to quickly move your files.</p>
    <ul>
      {#each $settingState.otherFolders as folder, i}
        <FolderEntry>
          <span name="icon">{i}</span>
          <p name="folder">{folder}</p>
        </FolderEntry>
      {/each}

      <FolderEntry>
        <span name="icon">+</span>
        <p name="folder">Add a folder…</p>
      </FolderEntry>
    </ul>
  </div>
</div>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
