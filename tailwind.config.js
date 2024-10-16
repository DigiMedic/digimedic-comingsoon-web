/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blumine: '#1b4d6a',
        astral: '#5b8a9a',
        'fountain-blue': '#5ba2c2',
        'powder-blue': '#a8d4e1',
        polar: '#ffffff',
      },
      fontFamily: {
        'space-bold-regular': ['Space Mono', 'monospace'],
        'space-bold-semibold': ['Space Mono', 'monospace'],
        'raleway-regular': ['Raleway', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
