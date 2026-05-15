/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        mutedAccessible: '#6B6159',
        sage: { DEFAULT: '#8B9E8D', light: '#C8D5C9', dark: '#5C7A5E', accessible: '#527054' },
        stone: { warm: '#F5F0EB', medium: '#E8DDD4', deep: '#C4B5A5' },
        navy: { DEFAULT: '#2C3E50', dark: '#1A252F' },
        cream: '#FAF7F4',
        muted: { DEFAULT: '#7A7068', dark: '#5A524C' },
      },
      fontFamily: { sans: ['Assistant', 'sans-serif'] },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
}
