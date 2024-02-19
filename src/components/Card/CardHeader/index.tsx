import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardHeaderProps {
  children?: React.ReactNode
  className?: string
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <PlaceSurface
    className={className}
    color="Salmon"
    paddingHorizontal={10}
    paddingTop={8}
    paddingBottom={6}
  >
    {children}
  </PlaceSurface>
}
