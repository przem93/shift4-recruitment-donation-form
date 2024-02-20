import clsx from "clsx"
import { useTypography } from "@/hooks/useTypography"
import type { PlaceSurfaceProps } from "../PlaceSurface"
import { PlaceSurface } from "../PlaceSurface"

import styles from './styles.module.css'

interface Props extends Pick<PlaceSurfaceProps, 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'> {
  children: React.ReactNode
  className?: string
  id: string
  label: string,
  validation?: React.ReactNode
}

export const Field = ({ children, className, id, label, validation, ...margins }: Props) => {
  const labelClassNames = useTypography({
    color: "MidnightGrey",
    size: "Small",
  })

  return <div className={styles.Field}>
    <label className={clsx(labelClassNames, styles.Label)} htmlFor={id}>{label}</label>
    <PlaceSurface border="Light" borderRadius="Small" className={clsx(className, styles.InputSurface)} {...margins}>
      {children}
    </PlaceSurface>
    {validation}
  </div>
}
