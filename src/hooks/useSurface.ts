import { useMemo } from "react"
import clsx from "clsx"
import borderStyles from "@/styles/surface/borders.module.css"
import borderRadiusStyles from "@/styles/surface/borders-radius.module.css"
import elevationsStyles from "@/styles/surface/elevations.module.css"
import colorsStyles from "@/styles/surface/colors.module.css"

export type SurfaceBorders = 'Light' | 'Dark' | 'None'
export type SurfaceBordersRadius = 'Small' | 'Medium'
export type SurfaceColors = 'AlmostWhite' |
  'BlushPink' |
  'LightSlate' |
  'DarkMidnightPurple' |
  'MidnightPurple'  |
  'OffWhite' |
  'RoyalPurple' |
  'Sand' |
  'Salmon' |
  'SkyBlue' |
  'UltraLightBlueGray' |
  'White'
export type SurfaceElevations = 1

interface Params {
  border?: SurfaceBorders
  borderRadius?: SurfaceBordersRadius
  color?: SurfaceColors
  elevation?: SurfaceElevations
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
