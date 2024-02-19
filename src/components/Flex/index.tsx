import { useMemo } from "react"
import clsx from "clsx"
import { Space } from "@/types/Space"

import gapsStyles from '@/styles/spaces/gaps.module.css'
import styles from './styles.module.css'

interface Props {
  alignItems?: 'Center' | 'FlexEnd' | 'FlexStart'
  children: React.ReactNode
  className?: string
  flexDirection?: 'Column' | 'Row'
  gap?: Space
}

export const Flex = ({
  alignItems,
  children,
  className,
  flexDirection,
  gap,
}: Props) => {
  const flexClassNames = useMemo(() => clsx(
    styles.Flex,
    alignItems && styles[`AlignItems${alignItems}`],
    className,
    flexDirection && styles[`FlexDirection${flexDirection}`],
    (gap || gap === 0) && gapsStyles.Gap,
    (gap || gap !== 0) && gapsStyles[`Gap-${gap}`],
  ), [alignItems, className, flexDirection, gap])
  return <div className={flexClassNames}>
    {children}
  </div>
}
