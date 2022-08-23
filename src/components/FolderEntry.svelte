<script lang="ts">
    import { basename } from "@tauri-apps/api/path";
</script>

<li on:click class="border-t border-t-slate-600 flex justify-between">
    <slot name="icon"></slot>
    <slot name="folder"></slot>
</li>