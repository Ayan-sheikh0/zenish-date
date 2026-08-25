/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          0: '#180B12',
          1: '#241019',
          2: '#2E1420',
          3: '#3a1a2b',
        },
        gold: {
          light: '#F0D9A8',
          DEFAULT: '#D4AF6A',
          dim: 'rgba(212,175,106,0.35)',
        },
        cream: {
          DEFAULT: '#F7ECDD',
          dim: 'rgba(247,236,221,0.62)',
        },
        rose: {
          DEFAULT: '#E37A93',
          deep: '#B04B63',
        },
        wine: {
          DEFAULT: '#6B1530',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Marcellus"', 'serif'],
        script: ['"Parisienne"', 'cursive'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.15, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.3)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 0.55 },
          '100%': { transform: 'translateY(460px) translateX(30px) rotate(200deg)', opacity: 0 },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '45%': { opacity: 0.85 },
          '50%': { opacity: 1 },
          '78%': { opacity: 0.9 },
        },
        sealPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        riseIn: {
          from: { opacity: 0, transform: 'translateY(14px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        cardIn: {
          from: { opacity: 0, transform: 'translateY(10px) scale(0.97)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        petalFall: 'petalFall 12s linear infinite',
        flicker: 'flicker 5s ease-in-out infinite',
        sealPulse: 'sealPulse 2.4s ease-in-out infinite',
        riseIn: 'riseIn 0.7s ease',
        cardIn: 'cardIn 0.6s ease',
      },
      backgroundImage: {
        'romantic-gradient':
          'radial-gradient(ellipse at 25% 0%, rgba(107,21,48,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(58,26,43,0.5) 0%, transparent 55%), linear-gradient(160deg, #180B12, #241019 55%, #2E1420)',
      },
      boxShadow: {
        glow: '0 14px 30px rgba(107,21,48,0.45)',
        glass: '0 30px 60px rgba(0,0,0,0.45)',
        card: '0 10px 22px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
