import type { HookTypographyParams } from "@/hooks/useTypography"
import { useTypography } from "@/hooks/useTypography"

interface Props extends HookTypographyParams {
  children: React.ReactNode
}

export const Span = ({ children, ...props }: Props) => {
  const spanClassName = useTypography(props)
  return <span className={spanClassName}>
    {children}
  </span>
}
