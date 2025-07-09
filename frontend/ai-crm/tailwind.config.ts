import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crm: {
          bg1: '#FAF7F3',
          bg2: '#F0E4D3',
          bg3: '#DCC5B2',
          accent: '#D9A299',
        },
      },
    },
  },
  plugins: [],
};

export default config;
