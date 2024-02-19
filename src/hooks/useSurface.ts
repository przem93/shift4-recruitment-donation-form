import { useMemo } from "react"
import clsx from "clsx"
import borderStyles from "@/styles/surface/borders.module.css"
import borderRadiusStyles from "@/styles/surface/borders-radius.module.css"
import elevationsStyles from "@/styles/surface/elevations.module.css"
import colorsStyles from "@/styles/surface/colors.module.css"

export type BackgroundColors =  'Purple'  | 'Salmon' | 'SkyBlue' | 'White'
export type Borders = 'Light' | 'Dark' | 'None'
export type BordersRadius = 'Small' | 'Medium'
export type Elevations = 1

interface Params {
  border?: Borders
  borderRadius?: BordersRadius
  color?: BackgroundColors
  elevation?: Elevations
}

export const useSurface = ({ border, borderRadius, color, elevation }: Params) => (
  useMemo(() => clsx(
    border && [borderStyles[border], borderStyles.Border],
    borderRadius && [[borderRadiusStyles[borderRadius]], borderRadiusStyles.BorderRadius],
    elevation && [[elevationsStyles[`Level-${elevation}`]], elevationsStyles.Elevation],
    colorsStyles.SurfaceColor,
    color && colorsStyles[color],
  ), [border, borderRadius, color, elevation])
)
