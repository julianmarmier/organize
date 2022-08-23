<script>
  // export let clickAction;
</script>

<button on:click class="rounded-full px-5 py-3 mt-5 hover:bg-gradient-to-tr text-white from-fuchsia-400 to-blue-400 bg-slate-400 transition-all">
    <slot></slot>
</button>

<style lang="postcss">
  /* TODO remove when done */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>