<script>
    import { appWindow } from '@tauri-apps/api/window'
    export let color;

    const handleBehavior = () => {
        switch(color) {
            case "red": return appWindow.close();
            case "yellow": return appWindow.minimize();
            case "green": return appWindow.toggleMaximize();
        }
    }

    const character = {
        "red": "×",
        "yellow": "−",
        "green": "🞰"
    }[color]

</script>

<div on:click="{handleBehavior}" class="rounded-full w-5 h-5 flex items-center justify-center bg-slate-200 border border-slate-300 border-solid mr-1 hover:bg-{color}-300 hover:cursor-pointer">
    {character}
</div>

