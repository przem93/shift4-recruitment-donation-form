import { Decimal } from "decimal.js"
import { FieldMoney } from "@/components/FieldMoney"
import { FieldMonth } from "@/components/FieldMonth"
import { Flex } from "@/components/Flex"
import { PlaceSurface } from "@/components/PlaceSurface"
import { Span } from "@/components/Typography/Span"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { FormValues } from "../../types/FormValues"

import styles from './styles.module.css'
import { useTypography } from "@/hooks/useTypography"

const formatOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  trailingZeroDisplay: "stripIfInteger"
}

const monthDifference = (date1: Date, date2: Date) => {
  var years = date2.getFullYear() - date1.getFullYear();
  var months = date2.getMonth() - date1.getMonth();
  return Math.abs(years * 12 + months);
}

const currentDate = new Date()

export const DonationFormContent = () => {
  const { control } = useFormContext<FormValues>()
  const amountField = useWatch<FormValues, 'amount'>({
    control,
    name: "amount"
  })
  const endMonthField = useWatch<FormValues, 'endMonth'>({
    control,
    name: "endMonth"
  })
  const strongClassNames = useTypography({
    color: "BlueGrey",
    family: "Inter",
    size: "XSmall",
  })
  const {
    amount,
    endMonth,
    total,
  } = useMemo(() => {
    const amount = amountField ? new Intl.NumberFormat("en-US", formatOptions).format(amountField) : 0
    const endMonth = Intl.DateTimeFormat('en-US', {
      month: "long",
      year: "numeric"
    }).format(endMonthField)
    const months = monthDifference(endMonthField, currentDate)
    const totalNumber = new Decimal(amountField ?? 0).mul(months).toNumber()
    const total = Intl.NumberFormat('en-US', { ...formatOptions, currency: "USD", style: "currency" }).format(totalNumber)

    return {
      amount,
      endMonth,
      total,
    }
  }, [amountField, endMonthField])

  return <>
    <Flex className={styles.Fields} gap={6}>
      <FieldMoney label="I can donate" name="amount" required />
      <FieldMonth label="Every month until" name="endMonth" min={currentDate} />
    </Flex>
    <PlaceSurface className={styles.TotalAmount} paddingTop={0} marginTop={8} border="None" borderRadius="Medium">
      <Flex alignItems="Center" justifyContent="SpaceBetween" paddingHorizontal={4}>
        <Span className={styles.TotalAmountLabel} color="BlueGrey" size="Medium" weight="Medium">Total amount</Span>
        <Span className={styles.TotalAmountNumber} color="PurpleGrey" family="Inter" size="XLarge" weight="Bold">{total}</Span>
      </Flex>
      <PlaceSurface borderRadius="Medium" color="SkyBlue" paddingHorizontal={4} paddingVertical={6} marginTop={6}>
        <Span size="XSmall" color="BlueGrey">
          You will be sending <strong className={strongClassNames}>${amount}</strong> every month, until <strong className={strongClassNames}>{endMonth}</strong>. Thank you!
        </Span>
      </PlaceSurface>
    </PlaceSurface>
  </>
}
