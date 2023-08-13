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
        'light-blue': '#54b4e2',
        'dark-blue': '#0093d9',
        'light-pink': '#ff7dbb',
        'dark-pink': '#ff5caa',
        'light-gray': '#d7d6d9',
        'dark-gray': '#1e1e1e',
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
