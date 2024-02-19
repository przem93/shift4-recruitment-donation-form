import { PlaceSurface } from "@/components/PlaceSurface"
import type { CardContent, CardContentProps } from "../CardContent"
import type { CardFooter, CardFooterProps } from "../CardFooter"
import type { CardHeaderProps, CardHeader } from "../CardHeader"

import styles from './styles.module.css'

type ContentChild = React.ReactElement<CardContentProps, typeof CardContent>
type FooterChild = React.ReactElement<CardFooterProps, typeof CardFooter>
type HeaderChild = React.ReactElement<CardHeaderProps, typeof CardHeader>

type Child = ContentChild | FooterChild | HeaderChild

interface Props {
  children?: Child | Child[]
}

export const Card = ({ children }: Props) => (
  <PlaceSurface
    borderRadius="Medium"
    className={styles.Card}
    color="White"
    elevation={1}
  >
    {children}
  </PlaceSurface>
)
