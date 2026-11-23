/** @type {import('tailwindcss').Config} */
// Palet 60 / 30 / 10 healthFlow v2 "Gym Malam"
//  60%  base   : latar hampir hitam kehijauan
//  30%  field  : hijau tua untuk kartu & permukaan
//  10%  accent : oranye menyala, hanya untuk progres "sekarang" + aksi utama
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        base: { DEFAULT: '#0B1310', deep: '#070C0A' },
        field: { DEFAULT: '#14261D', raised: '#1B3328', line: '#29473A', soft: '#9DB5A8' },
        accent: { DEFAULT: '#FF5B1F', glow: '#FF8A50', dim: '#3A1A0D' },
        ink: { DEFAULT: '#F2F5F0', muted: '#9DB5A8' },
        over: { DEFAULT: '#FF6B6B', dim: '#3A1414' },
      },
      fontFamily: {
        display: ['BarlowCondensed_700Bold'],
        displaySemi: ['BarlowCondensed_600SemiBold'],
        body: ['Barlow_400Regular'],
        bodyMedium: ['Barlow_500Medium'],
        bodySemi: ['Barlow_600SemiBold'],
      },
    },
  },
  plugins: [],
};
