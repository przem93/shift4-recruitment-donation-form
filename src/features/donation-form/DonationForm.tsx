import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { CardContent } from "@/components/Card/CardContent";
import { CardFooter } from "@/components/Card/CardFooter";
import { CardHeader } from "@/components/Card/CardHeader";
import { DonationFormContent } from "./components/DonationFormContent";
import { DonationFormHeader } from "./components/DonationFormHeader";
import { currentDate } from "@/consts/currentDate";

import styles from './styles.module.css'

export const DonationForm = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      amount: null,
      endMonth: currentDate
    }
  })

  return (
    <FormProvider {...methods}>
      <form
        className={styles.Form}
        onSubmit={methods.handleSubmit((e) => {
          console.log(e)
        })}
      >
        <Card className={styles.Card}>
          <CardHeader className={styles.Header}>
            <DonationFormHeader />
          </CardHeader>
          <CardContent className={styles.MobileSize}>
            <DonationFormContent />
          </CardContent>
          <CardFooter className={styles.MobileSize}>
            <Button className={styles.CancelButton} dataTestId="cancel" fullWidth variant="outlined">Cancel</Button>
            <Button dataTestId="continue" fullWidth type="submit">Continue</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}