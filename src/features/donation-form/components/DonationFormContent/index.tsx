import { FieldMoney } from "@/components/FieldMoney"
import { Flex } from "@/components/Flex"

import styles from './styles.module.css'

export const DonationFormContent = () => {
  return <>
    <Flex className={styles.Fields} gap={6}>
      <FieldMoney label="I can donate" name="amount" required />
    </Flex>
  </>
}
