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
      },
      colors: {
        'backlog': '#ACADF9',
        'in-progress': '#E26E46',
        'done': '#56B969',
      },
    },
  },
  plugins: [],
}
