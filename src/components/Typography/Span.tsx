import clsx from "clsx"
import type { HookTypographyParams } from "@/hooks/useTypography"
import { useTypography } from "@/hooks/useTypography"

interface Props extends HookTypographyParams {
  children: React.ReactNode,
  className?: string
  dataTestId?: string
}

export const Span = ({ children, className, dataTestId, ...props }: Props) => {
  const spanClassName = useTypography(props)
  return <span className={clsx(spanClassName, className)} data-testid={dataTestId}>
    {children}
  </span>
}
