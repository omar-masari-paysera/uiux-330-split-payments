import { plugin } from '@paysera/ui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    plugin.content()
  ],
  plugins: [
    plugin.theme({})
  ],
};
