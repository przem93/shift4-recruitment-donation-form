import React, { useMemo } from "react"
import clsx from 'clsx'

import styles from './Button.module.css'
import { useSurface } from "@/hooks/useSurface"
import { useTypography } from "@/hooks/useTypography"
import { useSpaces } from "@/hooks/useSpaces"

interface Props {
  children: string
  dataTestId: string
  fullWidth?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'contained' | 'outlined'
}

export const Button = ({ 
  children,
  dataTestId,
  fullWidth,
  onClick,
  variant = "contained"
}: Props) => {
  const surfaceClassNames = useSurface({
    border: variant === "outlined" ? "Dark" : "None",
    borderRadius: "Small",
    color: variant === "contained" ? "Purple" : undefined,
  })
  const typographyClassNames = useTypography({
    color: variant === "contained" ? "White" : "MidnightBlue",
    weight: "SemiBold"
  })
  const spacesClassNames = useSpaces({
    paddingHorizontal: 4,
    margin: 2
  })
  const buttonClassNames = useMemo(() => clsx(
    styles.Button,
    surfaceClassNames,
    typographyClassNames,
    spacesClassNames,
    variant === "contained" && styles.Contained,
    variant === "outlined" && styles.Outlined,
    fullWidth && styles.FullWidth
  ), [fullWidth, spacesClassNames, surfaceClassNames, typographyClassNames, variant])
  return <button
    className={buttonClassNames}
    data-testid={dataTestId}
    onClick={onClick}
  >
    {children}
  </button>
}
