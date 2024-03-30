import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

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
        'light-green': '#7eff7e',
        'dark-green': '#00cc00',
        'light-pink': '#ff7dbb',
        'dark-pink': '#ff5caa',
        'light-red': '#ff8c8c',
        'dark-red': '#cc0000',
        'light-gray': '#d7d6d9',
        'dark-gray': '#1e1e1e',
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.filled-symbol': {
          'font-variation-settings': '"FILL" 1',
        },
        '.fine-symbol': {
          'font-variation-settings': '"wght" 250',
        },
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      });
    },
  ],
} satisfies Config;
