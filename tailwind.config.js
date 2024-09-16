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
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-vertical': 'marqueeVertical 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
}