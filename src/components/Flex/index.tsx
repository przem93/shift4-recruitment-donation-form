import { useMemo } from "react"
import clsx from "clsx"
import { Space } from "@/types/Space"

import gapsStyles from '@/styles/spaces/gaps.module.css'
import styles from './styles.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  gap?: Space
}

export const Flex = ({
  children,
  className,
  gap,
}: Props) => {
  const flexClassNames = useMemo(() => clsx(
    styles.Flex,
    className,
    gap && [gapsStyles.Gap, gapsStyles[`Gap-${gap}`]],
  ), [className, gap])
  return <div className={flexClassNames}>
    {children}
  </div>
}
