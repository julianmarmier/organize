import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: [sveltePreprocess({
      postcss: true
    })]
  })],
  server: {
    host: "0.0.0.0",
    port: 3000
  }
})
