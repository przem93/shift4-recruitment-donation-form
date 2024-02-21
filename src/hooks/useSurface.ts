import { useMemo } from "react"
import clsx from "clsx"
import borderStyles from "@/styles/surface/borders.module.css"
import borderRadiusStyles from "@/styles/surface/borders-radius.module.css"
import elevationsStyles from "@/styles/surface/elevations.module.css"
import colorsStyles from "@/styles/surface/colors.module.css"

export const surfaceBorders = ['Light', 'Dark', 'Nones'] as const
export const surfaceBordersRadius = ['Small', 'Medium'] as const
export const surfaceColors = [
  'AlmostWhite',
  'BlushPink',
  'LightSlate',
  'DarkMidnightPurple',
  'MidnightPurple' ,
  'OffWhite',
  'RoyalPurple',
  'Sand',
  'Salmon',
  'SkyBlue',
  'UltraLightBlueGray',
  'White'
] as const

export type SurfaceBorders = typeof surfaceBorders[number]
export type SurfaceBordersRadius = typeof surfaceBordersRadius[number]
export type SurfaceColors = typeof surfaceColors[number]
export type SurfaceElevations = 1

export interface HookSurfaceParams {
  border?: SurfaceBorders
  borderRadius?: SurfaceBordersRadius
  color?: SurfaceColors
  elevation?: SurfaceElevations
}

export const useSurface = ({ border, borderRadius, color, elevation }: HookSurfaceParams) => (
  useMemo(() => clsx(
    border && [borderStyles.Border, borderStyles[border]],
    borderRadius && [borderRadiusStyles.BorderRadius, borderRadiusStyles[borderRadius]],
    elevation && [elevationsStyles.Elevation, [elevationsStyles[`Level-${elevation}`]]],
    colorsStyles.SurfaceColor,
    color && colorsStyles[color],
  ), [border, borderRadius, color, elevation])
)
