import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardContentProps {
  children?: React.ReactNode
}

export const CardContent = ({ children }: CardContentProps) => {
  return <PlaceSurface marginHorizontal={10} marginVertical={8}>
    {children}
  </PlaceSurface>
}
