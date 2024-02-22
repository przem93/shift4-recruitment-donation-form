import { Decimal } from "decimal.js"
import { FieldMoney } from "@/components/FieldMoney"
import { FieldMonth } from "@/components/FieldMonth"
import { Flex } from "@/components/Flex"
import { PlaceSurface } from "@/components/PlaceSurface"
import { Span } from "@/components/Typography/Span"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { FormValues } from "../../types/FormValues"
import { useTypography } from "@/hooks/useTypography"
import { currencyFormatter, dateFormatter, numberFormatter } from "@/utils/formatters"
import { currentDate } from "@/consts/currentDate"

import styles from './styles.module.css'

const monthDifference = (date1: Date, date2: Date) => {
  var years = date2.getFullYear() - date1.getFullYear();
  var months = date2.getMonth() - date1.getMonth();
  return years * 12 + months;
}

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
    const amount = amountField ? numberFormatter.format(amountField) : 0
    const endMonth = dateFormatter.format(endMonthField)
    const months = Math.max(monthDifference(currentDate, endMonthField), 0)
    const totalNumber = new Decimal(amountField ?? 0).mul(months).toNumber()
    const total = currencyFormatter.format(totalNumber)

    return {
      amount,
      endMonth,
      total,
    }
  }, [amountField, endMonthField])

  return <>
    <Flex className={styles.Fields} gap={6}>
      <FieldMoney dataTestId="amount" label="I can donate" name="amount" min={1} required />
      <FieldMonth dataTestId="endMonth" label="Every month until" name="endMonth" min={currentDate} />
    </Flex>
    <PlaceSurface className={styles.TotalAmount} paddingTop={0} marginTop={8} border="None" borderRadius="Medium">
      <Flex alignItems="Center" justifyContent="SpaceBetween" paddingHorizontal={4}>
        <Span className={styles.TotalAmountLabel} color="BlueGrey" size="Medium" weight="Medium">Total amount</Span>
        <Span dataTestId="total" className={styles.TotalAmountNumber} color="PurpleGrey" family="Inter" size="XLarge" weight="Bold">{total}</Span>
      </Flex>
      <PlaceSurface borderRadius="Medium" color="SkyBlue" paddingHorizontal={4} paddingVertical={6} marginTop={6}>
        <Span size="XSmall" color="BlueGrey">
          You will be sending <strong className={strongClassNames} data-testid="infoBox.amount">${amount}</strong> every month, until <strong data-testid="infoBox.endMonth" className={strongClassNames}>{endMonth}</strong>. Thank you!
        </Span>
      </PlaceSurface>
    </PlaceSurface>
  </>
}
