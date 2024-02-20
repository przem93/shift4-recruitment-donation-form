import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardContentProps {
  children?: React.ReactNode
  className?: string
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return <PlaceSurface className={className} marginHorizontal={10} marginVertical={8}>
    {children}
  </PlaceSurface>
}
