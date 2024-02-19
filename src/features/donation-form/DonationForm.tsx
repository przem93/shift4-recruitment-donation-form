import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { CardContent } from "@/components/Card/CardContent";
import { CardFooter } from "@/components/Card/CardFooter";
import { CardHeader } from "@/components/Card/CardHeader";
import { DonationFormHeader } from "./components/DonationFormHeader";

import styles from './styles.module.css'

export const DonationForm = () => (
  <Card className={styles.DonationForm}>
    <CardHeader className={styles.Header}>
      <DonationFormHeader />
    </CardHeader>
    <CardContent>test</CardContent>
    <CardFooter>
      <Button className={styles.CancelButton} dataTestId="cancel" variant="outlined" fullWidth>Cancel</Button>
      <Button dataTestId="Continue" fullWidth>Continue</Button>
    </CardFooter>
  </Card>
)