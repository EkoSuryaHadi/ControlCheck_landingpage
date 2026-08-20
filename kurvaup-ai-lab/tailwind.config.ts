import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        panel: '#0d1726',
        line: '#1a2a3f',
        glow: '#39d6c8'
      },
      boxShadow: {
        glow: '0 0 40px rgba(57,214,200,.16)'
      }
    },
  },
  plugins: [],
}
export default config
