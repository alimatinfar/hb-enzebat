import { ChipsProps } from "../Chips";

export type ChipsColorsType = 'gray' | 'success' | 'warning' | 'danger'
export type ChipsSizesType = 'sm'

function  useChipsStyles({color = 'gray', size = 'sm', onClose}: Partial<ChipsProps>) {

  const badgeStylesColors: Record<ChipsColorsType, string> = {
    'gray': `border border-gray-300 ${onClose ? 'bg-gray-100' : 'bg-gray-200'} `,
    'success': 'border border-green-300 bg-green-50 text-green-700',
    'warning': 'border border-amber-300 bg-amber-50 text-amber-700',
    'danger': 'border border-red-300 bg-red-50 text-red-600',
  }

  const badgeStylesSizes: Record<ChipsSizesType, string> = {
    'sm': 'text-sm py-0.5 px-2 rounded-lg',
  }

  const badgeStyles = {
    color: badgeStylesColors[color],
    size: badgeStylesSizes[size],
  }

  return {badgeStyles}
}

export default useChipsStyles;