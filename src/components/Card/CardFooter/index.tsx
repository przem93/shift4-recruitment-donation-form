import { Flex } from "@/components/Flex"
import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardFooterProps {
  children?: React.ReactNode
  className?: string
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return <PlaceSurface className={className} marginHorizontal={10} marginVertical={8}>
    <Flex gap={3}>
      {children}
    </Flex>
  </PlaceSurface>
}
