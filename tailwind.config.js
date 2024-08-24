module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blumine': 'var(--blumine)',
        'astral': 'var(--astral)',
        'fountain-blue': 'var(--fountain-blue)',
        'powder-blue': 'var(--powder-blue)',
        'polar': 'var(--polar)',
      },
      fontFamily: {
        'space': ['"Space Mono"', 'monospace'],
        'raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}