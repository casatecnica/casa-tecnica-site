/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts,md}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1F3F', 2: '#13305F', 3: '#1C3E73' },
        laranja: { DEFAULT: '#F28C1B', claro: '#FFE7CC', escuro: '#8A4600' },
        azul: { DEFAULT: '#1F6FC4', claro: '#DCEBFA', escuro: '#0F4C9C' },
        amarelo: { DEFAULT: '#F7C325', claro: '#FDF1C7', escuro: '#6B5200' },
        gelo: '#F4F6F9',
        tinta: '#13223A',
        cinza: '#556175',
        linha: '#DCE2EA',
        suave: '#C9D6E8',
        whats: { DEFAULT: '#15803D', escuro: '#116B33' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', 'Arial', 'sans-serif'],
        sans: ['Barlow', 'Arial', 'sans-serif'],
      },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
};
