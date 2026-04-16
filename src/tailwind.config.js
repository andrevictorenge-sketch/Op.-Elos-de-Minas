/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pmmg: {
          claro: '#efe3bd',
          main: '#d0c19e',
          medio: '#9f8e5f',
          escuro: '#8e8161',
          caqui: '#9b8a5c',
        }
      }
    },
  },
  plugins: [],
}