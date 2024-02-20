import React, { useCallback, useId, useMemo } from "react"
import { Field } from "../Field"
import { Flex } from "../Flex"
import { useController, useFormContext, FieldPath } from 'react-hook-form'
import { FieldError } from "../FieldError"
import { IconButton } from "../IconButton"
import { Span } from "../Typography/Span"

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
  const id = useId()
  const { control } = useFormContext()
  const minValidationDate = useMemo(() => (
    min ? Intl.DateTimeFormat('en-US', {
      month: "long",
      year: "numeric"
    }).format(min) : ''
  ), [min])
  const { field, formState: { errors } } = useController<FieldValues>({
    name,
    control,
    defaultValue: new Date(),
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
      month: Intl.DateTimeFormat('en-US', {
        month: "long"
      }).format(field.value),
      year: Intl.DateTimeFormat('en-US', {
        year: "numeric"
    }).format(field.value)
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
    className={styles.Field}
    id={id}
    label={label}
    paddingTop={3}
    paddingBottom={3}
    paddingRight={3}
    paddingLeft={3}
    validation={
      <FieldError name={name} errors={errors} />
    }
  >
    <Flex alignItems="Center" gap={4} justifyContent="SpaceBetween">
      <IconButton onClick={subtractMonth} icon="chevronLeft" />
      <Flex flexDirection="Column" alignItems="Center">
        <Span color="MidnightGrey" family="Rubik" weight="Medium">{month}</Span>
        <Span color="MidnightGrey" size="XSmall">{year}</Span>
      </Flex>
      <IconButton icon="chevronRight" onClick={addMonth} />
    </Flex>
  </Field>
}
