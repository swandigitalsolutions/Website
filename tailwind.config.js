/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        mist: 'rgb(var(--mist) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        red: {
          DEFAULT: 'rgb(var(--red) / <alpha-value>)',
          soft: 'rgb(var(--red-soft) / <alpha-value>)',
          deep: 'rgb(var(--red-deep) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #FF4B54 0%, #E9202A 45%, #8C0F16 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgb(var(--red) / 0.25) 0%, rgb(var(--red) / 0) 70%)',
      },
      boxShadow: {
        glow: '0 0 40px rgb(var(--red) / 0.25)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
