import { useSpaces } from '@/hooks/useSpaces'
import { useSurface } from '@/hooks/useSurface'
import { clsx } from 'clsx'
import { lazy, Suspense, useMemo } from 'react'

import styles from './styles.module.css'

const ChevronLeftIcon = lazy(() => import('@/icons/ChevronLeft').then((module) => ({ default: module.ChevronLeftIcon})))
const CloseIcon = lazy(() => import('@/icons/Close').then((module) => ({ default: module.CloseIcon})))

const icons = {
  chevronLeft: <ChevronLeftIcon />,
  close: <CloseIcon />,
} as const

interface Props {
  className?: string
  icon: keyof typeof icons,
  size?: 'Small' | 'Medium'
  color?: 'SkyBlue' | 'Salmon'
}

export const IconButton = ({ className, color = 'SkyBlue', icon, size }: Props) => {
  const surfacesClassNames = useSurface({
    border: "None",
    borderRadius: "Small",
  })
  const spacesClassNames = useSpaces({
    padding: size === "Medium" ? 2 : 0
  })
  const iconButtonClassName = useMemo(() => (
    clsx(
      className,
      spacesClassNames,
      surfacesClassNames,
      styles.IconButton,
      size && styles[size],
      styles[color]
    )
  ), [className, color, size, spacesClassNames, surfacesClassNames])
  return (
    <button className={iconButtonClassName}>
      <Suspense fallback=''>
        {icons[icon]}
      </Suspense>
    </button>
  )
}
