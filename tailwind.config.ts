import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      tablet: '480px',
      laptop: '1024px',
      monitor: '1920px',
    },
    extend: {
      colors: {
        blue: '#064266',
        'blue-primary': '#0065a0',
        'blue-secondary': '#54b4e2',
        'dark-pink': '#ff5caa',
        'light-pink': '#ff7dbb',
        mint: '#8ce5e5',
        yellow: '#fee45d',
        grey: '#d7d6d9',
        'black-primary': '#121212',
        'black-secondary': '#1e1e1e',
        'black-tertiary': '#1f1f1f',
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 0px 30px #0000000d',
      },
    },
  },
  plugins: [],
} satisfies Config;
