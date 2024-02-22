import { HTMLAttributes } from "react"
import clsx from "clsx"
import { useTypography } from "@/hooks/useTypography"
import type { PlaceSurfaceProps } from "../PlaceSurface"
import { PlaceSurface } from "../PlaceSurface"

import styles from './styles.module.css'

interface Props extends Pick<PlaceSurfaceProps, 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'> {
  ariaDescribedBy?: HTMLAttributes<HTMLDivElement>['aria-describedby']
  ariaInvalid?: HTMLAttributes<HTMLDivElement>['aria-invalid']
  ariaLive?: HTMLAttributes<HTMLDivElement>['aria-live']
  ariaValueMin?: HTMLAttributes<HTMLDivElement>['aria-valuemin']
  ariaValueNow?: HTMLAttributes<HTMLDivElement>['aria-valuenow']
  ariaValueText?: HTMLAttributes<HTMLDivElement>['aria-valuetext']
  children: React.ReactNode
  className?: string
  dataTestId?: string
  id?: string
  label: string
  labelId?: string
  role?: HTMLAttributes<HTMLDivElement>['role']
  tabIndex?: number
  validation?: React.ReactNode
}

export const Field = ({
    ariaDescribedBy,
    ariaInvalid,
    ariaLive,
    ariaValueMin,
    ariaValueNow,
    ariaValueText,
    children,
    className,
    dataTestId,
    id,
    label,
    labelId,
    role,
    tabIndex,
    validation,
    ...margins
  }: Props
) => {
  const labelClassNames = useTypography({
    color: "MidnightGrey",
    size: "Small",
  })

  return <div
    aria-describedby={ariaDescribedBy}
    aria-invalid={ariaInvalid}
    aria-labelledby={labelId}
    aria-live={ariaLive}
    aria-valuemin={ariaValueMin}
    aria-valuenow={ariaValueNow}
    aria-valuetext={ariaValueText}
    className={styles.Field}
    data-testid={dataTestId}
    role={role}
    tabIndex={tabIndex}
  >
    <label id={labelId} className={clsx(labelClassNames, styles.Label)} htmlFor={id}>{label}</label>
    <PlaceSurface border="Light" borderRadius="Small" className={clsx(className, styles.InputSurface)} {...margins}>
      {children}
    </PlaceSurface>
    {validation}
  </div>
}
