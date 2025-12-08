import kookFont from "@/constances/localFonts/kookFont";

const allFonts = [
  kookFont
]

const allFontsClassName = allFonts.map(font => font.variable).join(' ')

export default allFontsClassName