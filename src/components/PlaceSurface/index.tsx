import type { HookSpacesParams } from "@/hooks/useSpaces"
import { useSpaces } from "@/hooks/useSpaces"
import type { Borders, BordersRadius, BackgroundColors } from "@/hooks/useSurface"
import { useSurface } from "@/hooks/useSurface"
import clsx from "clsx"
import { useMemo } from "react"

type Props = {
  border?: Borders
  borderRadius?: BordersRadius
  children: React.ReactNode
  className?: string,
  color?: BackgroundColors
} & HookSpacesParams

export const PlaceSurface = ({
  border,
  borderRadius,
  children,
  className,
  color,
  ...spacesProps
}: Props) => {
  const spacesClassNames = useSpaces(spacesProps)
  const surfaceClassNames = useSurface({
    border,
    borderRadius,
    color
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
