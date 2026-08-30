/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060607',
        surface: '#0E0E11',
        surface2: '#151518',
        line: '#232327',
        red: {
          DEFAULT: '#E9202A',
          soft: '#FF4B54',
          deep: '#8C0F16',
        },
        mist: '#9A9AA3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #FF4B54 0%, #E9202A 45%, #8C0F16 100%)',
        'radial-glow': 'radial-gradient(circle at center, rgba(233,32,42,0.25) 0%, rgba(233,32,42,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(233,32,42,0.25)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
