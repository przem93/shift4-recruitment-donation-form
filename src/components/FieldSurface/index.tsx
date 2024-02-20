import { useSurface } from "@/hooks/useSurface"
import clsx from "clsx"
import { useMemo } from "react"
import { PlaceSurface } from "../PlaceSurface"

interface Props {
  children: React.ReactNode,
  className?: string
}

export const FieldSurface = ({ children, className }: Props) => {
  const surfaceClassNames = useSurface({
    border: "Light",
    borderRadius: "Small"
  })
  const fieldSurfaceClassNames = useMemo(() => clsx(
    className,
    surfaceClassNames
  ), [className, surfaceClassNames])
  return <PlaceSurface className={fieldSurfaceClassNames}>
    {children}
  </PlaceSurface>
}