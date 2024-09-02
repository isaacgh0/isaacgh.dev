/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {},
    colors: {
      ...colors,
      'clr-project-main': '#DD0426',
      'clr-project-dark': '#0C1B33',
      'clr-project-light': '#FFFFFF',
      'clr-project-secondary': '#2EC4B6',
      'clr-project-main-light': '#F02D3A'
    }
  },
  plugins: []
}
