/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      borderRadius: {
        'circ': '100%'
      },
      maxHeight: {
        'almost-full': 'calc(100vh - 5rem)'
      }
    },
  },
  plugins: [],
}
