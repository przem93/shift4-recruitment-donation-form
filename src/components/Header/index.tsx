import { useMemo } from "react"
import { clsx } from "clsx"
import { useSurface } from "@/hooks/useSurface"
import { useSpaces } from "@/hooks/useSpaces"

interface Props {
  logo: React.ReactNode
}

export const Header = ({ logo }: Props) => {
  const surfaceClassNames = useSurface({
    color: "White"
  })
  const spacesClassNames = useSpaces({
    paddingHorizontal: 10,
    paddingVertical: 6
  })
  const headerClassName = useMemo(() => (
    clsx(
      spacesClassNames,
      surfaceClassNames
    )
  ), [spacesClassNames, surfaceClassNames])

  return <header className={headerClassName}>
    {logo}
  </header>
}
