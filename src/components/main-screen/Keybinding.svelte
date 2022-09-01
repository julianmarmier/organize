<script lang="ts">
    export let positioning: string
    export let circled = true;
</script>

<div class={`absolute text-black ${positioning} ${circled ? "rounded-full" : "rounded-md"} h-5 w-5 bg-slate-200  flex place-content-center place-items-center`}>
    <slot></slot>
</div>