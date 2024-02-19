import { useMemo } from "react"
import clsx from "clsx"
import { Space } from "@/types/Space"

import gapsStyles from '@/styles/spaces/gaps.module.css'
import styles from './styles.module.css'

interface Props {
  alignItems?: 'Center' | 'FlexEnd' | 'FlexStart'
  children: React.ReactNode
  className?: string
  gap?: Space
}

export const Flex = ({
  alignItems,
  children,
  className,
  gap,
}: Props) => {
  const flexClassNames = useMemo(() => clsx(
    styles.Flex,
    alignItems && [styles.AlignItems, styles[`AlignItems${alignItems}`]],
    className,
    gap && [gapsStyles.Gap, gapsStyles[`Gap-${gap}`]],
  ), [alignItems, className, gap])
  return <div className={flexClassNames}>
    {children}
  </div>
}
