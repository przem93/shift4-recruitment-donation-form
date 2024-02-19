import { useMemo } from "react"
import { clsx } from "clsx"
import { useSurface } from "@/hooks/useSurface"
import { useSpaces } from "@/hooks/useSpaces"

interface Props {
  className?: string
  logo: React.ReactNode
}

export const Header = ({ className, logo }: Props) => {
  const surfaceClassNames = useSurface({
    color: "White"
  })
  const spacesClassNames = useSpaces({
    paddingHorizontal: 10,
    paddingVertical: 6
  })
  const headerClassName = useMemo(() => (
    clsx(
      className,
      spacesClassNames,
      surfaceClassNames
    )
  ), [className, spacesClassNames, surfaceClassNames])

  return <header className={headerClassName}>
    {logo}
  </header>
}
