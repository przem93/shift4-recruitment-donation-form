import type { ButtonHTMLAttributes } from 'react'
import { lazy, Suspense, useMemo } from 'react'
import { useSpaces } from '@/hooks/useSpaces'
import { useSurface } from '@/hooks/useSurface'
import { clsx } from 'clsx'

import styles from './styles.module.css'

const ChevronLeftIcon = lazy(() => import('@/icons/ChevronLeft').then((module) => ({ default: module.ChevronLeftIcon})))
const ChevronRightIcon = lazy(() => import('@/icons/ChevronRight').then((module) => ({ default: module.ChevronRightIcon})))
const CloseIcon = lazy(() => import('@/icons/Close').then((module) => ({ default: module.CloseIcon})))

const icons = {
  chevronLeft: <ChevronLeftIcon />,
  chevronRight: <ChevronRightIcon />,
  close: <CloseIcon />,
} as const

interface Props {
  className?: string
  color?: 'SkyBlue' | 'Salmon'
  icon: keyof typeof icons
  onClick?: () => void
  size?: 'Small' | 'Medium'
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const IconButton = ({ className, color = 'SkyBlue', icon, onClick, size, type = "button" }: Props) => {
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
    <button className={iconButtonClassName} onClick={onClick} type={type}>
      <Suspense fallback=''>
        {icons[icon]}
      </Suspense>
    </button>
  )
}
