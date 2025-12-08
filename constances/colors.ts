const tailwindColors = require('tailwindcss/colors')

export type ColorNameType = keyof typeof COLORS

const COLORS = {
  primary: tailwindColors.blue["500"],
  red: tailwindColors.red["500"],
  dark: tailwindColors.gray["900"],
  white: '#ffffff',
}

export default COLORS