import type { HookSpacesParams } from "@/hooks/useSpaces"
import { useSpaces } from "@/hooks/useSpaces"
import type { BackgroundColors, Borders, BordersRadius, Elevations } from "@/hooks/useSurface"
import { useSurface } from "@/hooks/useSurface"
import clsx from "clsx"
import { useMemo } from "react"

type Props = {
  border?: Borders
  borderRadius?: BordersRadius
  children: React.ReactNode
  className?: string,
  color?: BackgroundColors
  elevation?: Elevations
} & HookSpacesParams

export const PlaceSurface = ({
  border,
  borderRadius,
  children,
  className,
  color,
  elevation,
  ...spacesProps
}: Props) => {
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
