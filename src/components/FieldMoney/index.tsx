import React, { useCallback, useId, useMemo, useRef } from "react"
import { Decimal } from 'decimal.js';
import clsx from "clsx"
import { Field } from "../Field"
import { DollarIcon } from '@/icons/Dollar'
import { Flex } from "../Flex"
import { useTypography } from "@/hooks/useTypography"
import { useController, useFormContext } from 'react-hook-form'
import { FieldError } from "../FieldError"
import { useSpaces } from "@/hooks/useSpaces"
import { useSurface } from "@/hooks/useSurface"

import styles from './styles.module.css'
import { numberFormatter } from "@/utils/formatters";

interface Props {
  dataTestId?: string
  label: string
  name: string
  min?: number
  required?: boolean
}

const decimalSeparator = '.'
const possibleSeparators = [decimalSeparator, ',']
const backspace = 'Backspace'
const arrowLeft = 'ArrowLeft'
const arrowRight = 'ArrowRight'
const tab = 'Tab'
const allowedKeyCodes = [...[...Array(10)].map((_item, index) => `${index}`), ...possibleSeparators, backspace, arrowLeft, arrowRight, tab]

const limitTo2DecimalDigits = (number: number) => {
  const decimalNumber = new Decimal(number)

  return decimalNumber.mul(100).floor().div(100).toNumber()
}
const parseFormattedValueToNumber = (value: string) => parseFloat(value.replace(/,/g, ''))

export const FieldMoney = ({ dataTestId, label, name, min, required }: Props) => {
  const lasTypedChard = useRef('')
  const inputRef = useRef<HTMLInputElement | null>()
  const id = useId()
  const errorId = useId()
  const { control } = useFormContext()
  const { field, formState: { errors } } = useController({
    name,
    control,
    rules: {
      required: required && 'Field is required',
      min: min && min > -1 ? {
        value: 1,
        message: 'Value must be grater then 0'
      } : undefined
    }
  })
  const typographyNames = useTypography({
    color: "MidnightBlue",
    family: "Rubik",
    size: "Medium",
    weight: "Medium"
  })
  const spacesClassNames = useSpaces({
    padding: 0
  })
  const surfacesClassNames = useSurface({
    border: "None"
  })
  const inputClassName = useMemo(() => clsx(
    styles.Input,
    spacesClassNames,
    surfacesClassNames,
    typographyNames
  ), [spacesClassNames, surfacesClassNames, typographyNames])

  const replaceDecimalSeparator = useCallback((value: string, position: number) => {
    if (possibleSeparators.includes(lasTypedChard.current)) {
      return `${value.slice(0, position)}${decimalSeparator}${value.slice(position + 1)}`
    }
  
    return value
  }, [])

  const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPosition = e.target.selectionStart || 0
    let newValue = replaceDecimalSeparator(e.target.value, currentPosition - 1)
    const [, decimal] = newValue.split(decimalSeparator)
    const hasDecimalZeros = decimal && (decimal === '0' && decimal.length === 1 || decimal[1] === '0')
    const isLastCharSeparator = newValue.at(-1) === decimalSeparator
    if (isLastCharSeparator) {
      newValue = newValue.slice(0, newValue.length - 1)
    }
    const newNumber = limitTo2DecimalDigits(parseFormattedValueToNumber(newValue));
    field.onChange(newNumber)

    if (inputRef.current) {
      const formattedNumber = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: hasDecimalZeros ? 0 : 2
      }).format(newNumber)
      // separator is omitted by formatter when there is 0 for decimal or input value ends with separator char
      const addDecimalSeparator = isLastCharSeparator || hasDecimalZeros
      const inputValue = `${formattedNumber}${addDecimalSeparator ? decimalSeparator : ''}${hasDecimalZeros ? decimal.slice(0,2) : ''}`
      const valuesLengthDifference = inputValue.length - inputRef.current.value.length
      const newPosition = Math.max(currentPosition + valuesLengthDifference, 0)

      inputRef.current.value = inputValue
      inputRef.current.setSelectionRange(newPosition, newPosition)
    }
  }, [field, replaceDecimalSeparator])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      updateValue(e)
    } else {
      field.onChange()
    }
  }, [field, updateValue])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const isKeySeparator = possibleSeparators.includes(e.key)
    const isEmptyField = e.currentTarget.value === ''
    const hasSeparator = e.currentTarget.value.includes(decimalSeparator)
    const isSpecialKey = !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey
    if (
      isSpecialKey &&
      (
        !allowedKeyCodes.includes(e.key) ||
        isKeySeparator &&
        (isEmptyField || hasSeparator)
      )
    ) {
      e.preventDefault()
    } else {
      lasTypedChard.current = e.key
    }
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (e.target.value) {
      const numberValue = parseFormattedValueToNumber(value)
      const formattedNumber = numberFormatter.format(numberValue)
      e.target.value = formattedNumber
    }

    field.onBlur()
  }, [field])

  return <Field
    className={styles.Field}
    dataTestId={dataTestId}
    id={id}
    label={label}
    paddingTop={4}
    paddingBottom={4}
    paddingRight={4}
    paddingLeft={2}
    validation={
      <FieldError id={errorId} name={name} errors={errors} />
    }
  >
    <Flex gap={2}>
      <DollarIcon />
      <input
        aria-describedby={errorId}
        aria-invalid={Boolean(errors[name])}
        autoComplete="off"
        className={inputClassName}
        data-testid={`${dataTestId}.input`}
        defaultValue={field.value}
        disabled={field.disabled}
        id={id}
        inputMode="decimal"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="0.00"
        ref={(e) => {
          field.ref(e)
          inputRef.current = e
        }}
        name={field.name}
      />
    </Flex>
  </Field>
}
