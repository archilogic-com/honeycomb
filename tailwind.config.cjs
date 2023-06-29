/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind/tailwind-preset.cjs')],
  content: ['./src/**/*.{js,ts,vue,mdx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('./tailwind/base.cjs')]
}
