import { PlaceSurface } from "@/components/PlaceSurface"

export interface CardHeaderProps {
  children?: React.ReactNode
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  return <PlaceSurface
    color="Salmon"
    paddingHorizontal={10}
    paddingTop={8}
    paddingBottom={6}
  >
    {children}
  </PlaceSurface>
}
