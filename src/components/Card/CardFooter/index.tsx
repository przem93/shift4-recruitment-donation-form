import { Flex } from "@/components/Flex"
import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardFooterProps {
  children?: React.ReactNode
}

export const CardFooter = ({ children }: CardFooterProps) => {
  return <PlaceSurface marginHorizontal={10} marginVertical={8}>
    <Flex gap={3}>
      {children}
    </Flex>
  </PlaceSurface>
}
