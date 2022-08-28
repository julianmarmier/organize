<script lang="ts">
    export let positioning: string
</script>

<div class={`absolute text-black ${positioning} h-5 w-5 bg-slate-200 rounded-full flex place-content-center place-items-center`}>
    <slot></slot>
</div>