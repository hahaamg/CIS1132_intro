/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-tc': ['"Noto Sans TC"', 'sans-serif'],
        'mono-jb': ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
