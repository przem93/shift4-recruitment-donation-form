import { useMemo } from "react"
import clsx from "clsx"
import { Space } from "@/types/Space"

import gapsStyles from '@/styles/spaces/gaps.module.css'
import styles from './styles.module.css'
import { HookSpacesParams, useSpaces } from "@/hooks/useSpaces"

type Props = {
  alignItems?: 'Center' | 'FlexEnd' | 'FlexStart'
  children: React.ReactNode
  className?: string
  flexDirection?: 'Column' | 'Row'
  gap?: Space
  justifyContent?: 'Center' | 'FlexEnd' | 'FlexStart' | 'SpaceBetween'
} & HookSpacesParams

export const Flex = ({
  alignItems,
  children,
  className,
  flexDirection,
  gap,
  justifyContent,
  ...spaces
}: Props) => {
  const spacesClassNames = useSpaces(spaces)
  const flexClassNames = useMemo(() => clsx(
    spacesClassNames,
    styles.Flex,
    alignItems && styles[`AlignItems${alignItems}`],
    justifyContent && styles[`JustifyContent${justifyContent}`],
    className,
    flexDirection && styles[`FlexDirection${flexDirection}`],
    (gap || gap === 0) && gapsStyles.Gap,
    (gap || gap !== 0) && gapsStyles[`Gap-${gap}`],
  ), [alignItems, className, flexDirection, gap, justifyContent, spacesClassNames])
  return <div className={flexClassNames}>
    {children}
  </div>
}
