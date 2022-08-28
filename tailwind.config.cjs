/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      borderRadius: {
        'circ': '100%'
      }
    },
  },
  plugins: [],
}
