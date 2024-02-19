import { useMemo } from "react"
import clsx from "clsx"
import borderStyles from "@/styles/surface/borders.module.css"
import borderRadiusStyles from "@/styles/surface/borders-radius.module.css"
import colorsStyles from "@/styles/surface/colors.module.css"

type Borders = 'Light' | 'Dark' | 'None'
type BordersRadius = 'Small' | 'Medium'
type Colors = 'SkyBlue' | 'Salmon' | 'Purple'

interface Params {
  border?: Borders
  borderRadius?: BordersRadius
  color?: Colors
}

export const useSurface = ({ border, borderRadius, color }: Params) => (
  useMemo(() => clsx(
    border && [borderStyles[border], borderStyles.Border],
    borderRadius && [[borderRadiusStyles[borderRadius]], borderRadiusStyles.BorderRadius],
    colorsStyles.SurfaceColor,
    color && colorsStyles[color],
  ), [border, borderRadius, color])
)