import { useSpaces } from "@/hooks/useSpaces"
import type { HookTypographyParams } from "@/hooks/useTypography"
import { useTypography } from "@/hooks/useTypography"
import { clsx } from "clsx"
import { useMemo } from "react"

interface Props extends Omit<HookTypographyParams, 'size'> {
  children: React.ReactNode
  className?: string
}

export const H1 = ({ children, className, ...props }: Props) => {
  const typographyClassNames = useTypography({
    size: "XLarge",
    weight: "SemiBold",
    ...props
  })
  const spacesClassName = useSpaces({
    marginBottom: 1
  })
  const h1ClassNames = useMemo(() => (
    clsx(className, typographyClassNames, spacesClassName)
  ), [className, spacesClassName, typographyClassNames])
  return <h1 className={h1ClassNames}>
    {children}
  </h1>
}
