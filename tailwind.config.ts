import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (autres pages)
        'noir-salle': '#0F0A06',
        'anthracite': '#160E08',
        'anthracite-2': '#1E1208',
        'or-akham': '#E8A020',
        'or-hover': '#F0B040',
        'or-brule': '#3D2B00',
        'ivoire': '#F5EDD8',
        'ivoire-muted': 'rgba(245,237,216,0.62)',
        'ivoire-ghost': 'rgba(245,237,216,0.28)',
        'fiction': '#C94B1A',
        'documentaire': '#2D5A3D',
        'services-cat': '#A63D2F',
        'live-red': '#C94B1A',
        // Zellige system (home)
        'safran': '#E8A020',
        'orange-brule': '#C94B1A',
        'terracotta': '#A63D2F',
        'ocre': '#D4762C',
        'carmin': '#8B1A1A',
        'noir-absolu': '#060606',
        'noir-chaud': '#0F0A06',
        'noir-surface': '#160E08',
        'noir-relief': '#1E1208',
        'ivoire-pur': '#F5EDD8',
        'ivoire-warm': '#C8B898',
        'ivoire-low': '#7A6A52',
        'flash-blanc': '#FFFDF5',
        'brulure': '#FF6B1A',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-dmsans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      aspectRatio: {
        'cinema': '2.39 / 1',
        'affiche': '2 / 3',
      },
      letterSpacing: {
        'meta': '0.12em',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'ticker': 'ticker 40s linear infinite',
        'ticker-fast': 'ticker 25s linear infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'scroll-down': 'scroll-down 2.2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'film-jump': 'filmJump 0.1s ease forwards',
        'fragment-float': 'fragmentFloat 9s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '20%': { transform: 'translate(-15%,5%)' },
          '30%': { transform: 'translate(7%,-25%)' },
          '40%': { transform: 'translate(-5%,25%)' },
          '50%': { transform: 'translate(-15%,10%)' },
          '60%': { transform: 'translate(15%,0%)' },
          '70%': { transform: 'translate(0%,15%)' },
          '80%': { transform: 'translate(3%,35%)' },
          '90%': { transform: 'translate(-10%,10%)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'scroll-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        scan: {
          '0%': { top: '-2px' },
          '100%': { top: '100%' },
        },
        filmJump: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(120vh)' },
        },
        fragmentFloat: {
          '0%, 100%': { transform: 'translate(0,0) rotate(var(--rot,0deg))' },
          '50%': { transform: 'translate(6px,-10px) rotate(calc(var(--rot,0deg) + 1.5deg))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
