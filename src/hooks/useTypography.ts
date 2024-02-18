import { useMemo } from "react"
import clsx from "clsx"
import colorsStyles from "@/styles/typography/colors.module.css"
import sizesStyles from "@/styles/typography/sizes.module.css"
import weightsStyles from "@/styles/typography/weights.module.css"

type Colors = 'MidnightPurple' | 'MidnightGrey' | 'MidnightBlue' | 'White' | 'Black' | 'LightGrey' | 'PurpleGrey'
type Size = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall'
type Weight = 'Light' | 'Medium' | 'SemiBold' | 'Bold'

interface Params {
  color?: Colors
  size?: Size
  weight?: Weight
}

export const useTypography = ({ color, size, weight }: Params) => (
  useMemo(() => clsx(
    colorsStyles.FontColor,
    color && colorsStyles[color],
    sizesStyles.FontSize,
    size && sizesStyles[size],
    weight && [weightsStyles[weight], weightsStyles.FontWeight],
  ), [color, size, weight])
)
