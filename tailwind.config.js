/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'soft': '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'arrow-down': "url('/src/assets/icons/arrow-down.svg')",
        'search': "url('/src/assets/icons/search.svg')",
        'close': "url('/src/assets/icons/close.svg')",
      },
      colors: {
        'backlog': '#ACADF9',
        'in-progress': '#E26E46',
        'done': '#56B969',
        'bug': '#F32E2E',
        'feature': '#56B969',
        'refactor': '#E034CF',
      },
      gridTemplateRows: {
        'auto': 'auto',
      }
    },
  },
  plugins: [],
}
