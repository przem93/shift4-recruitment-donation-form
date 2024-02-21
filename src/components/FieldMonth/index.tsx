import React, { useCallback, useId, useMemo } from "react"
import { Field } from "../Field"
import { Flex } from "../Flex"
import { useController, useFormContext } from 'react-hook-form'
import { FieldError } from "../FieldError"
import { IconButton } from "../IconButton"
import { Span } from "../Typography/Span"
import { dateFormatter, monthFormatter, yearFormatter } from "@/utils/formatters"
import { currentDate } from "@/consts/currentDate"

import styles from './styles.module.css'

type FieldValues = Record<string, Date>

interface Props {
  label: string
  name: string
  min?: Date
}

export const FieldMonth = ({
  label,
  name,
  min
}: Props) => {
  const errorId = useId()
  const labelId = useId()
  const minValidationDate = useMemo(() => (
    min ? dateFormatter.format(min) : ''
  ), [min])
  const { control } = useFormContext()
  const { field, formState: { errors } } = useController<FieldValues>({
    name,
    control,
    defaultValue: currentDate,
    rules: {
      validate: (value) => {
        if (min && value < min) {
          return `Date must be grater then ${minValidationDate}`
        }

        return true
      }
    }
  })
  const {
    month,
    year,
  } = useMemo(() => ({
      month: monthFormatter.format(field.value),
      year: yearFormatter.format(field.value)
    }), 
    [field.value]
  )
  const changeMonth = useCallback((direction: 1 | - 1) => {
    const date = new Date(field.value);

    date.setDate(1)
    date.setMonth(date.getMonth() + direction);
  
    field.onChange(date)
  }, [field])
  const addMonth = useCallback(() => {
    changeMonth(1)
  }, [changeMonth])
  const subtractMonth = useCallback(() => {
    changeMonth(-1)
  }, [changeMonth])

  return <Field
    ariaDescribedBy={errorId}
    ariaInvalid={Boolean(errors[name])}
    ariaLive="polite"
    ariaValueMin={min && min.getFullYear() * 100 + min.getMonth()}
    ariaValueNow={field.value && field.value.getFullYear() * 100 + field.value.getMonth()}
    ariaValueText={`${month} ${year}`}
    className={styles.Field}
    label={label}
    labelId={labelId}
    paddingTop={3}
    paddingBottom={3}
    paddingRight={3}
    paddingLeft={3}
    role="slider"
    tabIndex={0}
    validation={
      <FieldError id={errorId} name={name} errors={errors} />
    }
  >
    <Flex alignItems="Center" gap={4} justifyContent="SpaceBetween">
      <IconButton ariaLabel="Previous month" dataTestId={`${name}.PrevMonth`} onClick={subtractMonth} icon="chevronLeft" />
      <Flex flexDirection="Column" alignItems="Center">
        <Span color="MidnightGrey" dataTestId={`${name}.Month`} family="Rubik" weight="Medium">{month}</Span>
        <Span color="MidnightGrey" dataTestId={`${name}.Year`} size="XSmall">{year}</Span>
      </Flex>
      <IconButton ariaLabel="Next month" dataTestId={`${name}.NextMonth`} icon="chevronRight" onClick={addMonth} />
    </Flex>
  </Field>
}
