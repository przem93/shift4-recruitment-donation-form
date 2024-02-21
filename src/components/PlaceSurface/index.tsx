import type { HookSpacesParams } from "@/hooks/useSpaces"
import { useSpaces } from "@/hooks/useSpaces"
import type { SurfaceBorders, SurfaceBordersRadius, SurfaceColors, SurfaceElevations } from "@/hooks/useSurface"
import { useSurface } from "@/hooks/useSurface"
import clsx from "clsx"
import { useMemo } from "react"

export type PlaceSurfaceProps = {
  border?: SurfaceBorders
  borderRadius?: SurfaceBordersRadius
  children: React.ReactNode
  className?: string,
  color?: SurfaceColors
  elevation?: SurfaceElevations
} & HookSpacesParams

export const PlaceSurface = ({
  border,
  borderRadius,
  children,
  className,
  color,
  elevation,
  ...spacesProps
}: PlaceSurfaceProps) => {
  const spacesClassNames = useSpaces(spacesProps)
  const surfaceClassNames = useSurface({
    border,
    borderRadius,
    color,
    elevation,
  })
  const placeClassName = useMemo(() => clsx(
    className,
    spacesClassNames,
    surfaceClassNames
  ), [className, spacesClassNames, surfaceClassNames])

  return <div className={placeClassName}>
    {children}
  </div>
}
