import clsx from "clsx"
import type { HookTypographyParams } from "@/hooks/useTypography"
import { useTypography } from "@/hooks/useTypography"

interface Props extends HookTypographyParams {
  children: React.ReactNode,
  className?: string
}

export const Span = ({ children, className, ...props }: Props) => {
  const spanClassName = useTypography(props)
  return <span className={clsx(spanClassName, className)}>
    {children}
  </span>
}
