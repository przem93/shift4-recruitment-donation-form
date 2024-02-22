import { useMemo } from "react"
import clsx from "clsx"
import { Inter, Rubik, Work_Sans } from "next/font/google";

import colorsStyles from "@/styles/typography/colors.module.css"
import sizesStyles from "@/styles/typography/sizes.module.css"
import weightsStyles from "@/styles/typography/weights.module.css"

type Colors = 'MidnightPurple' | 'MidnightGrey' | 'MidnightBlue' | 'White' | 'Black' | 'Red' | 'LightGrey' | 'PurpleGrey' | 'BlueGrey'
type Family = 'Inter' | 'Rubik' | 'WorkSans'
type Size = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall'
type Weight = 'Light' | 'Medium' | 'SemiBold' | 'Bold'


const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: true });
const rubik = Rubik({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: true });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: true });

export interface HookTypographyParams {
  color?: Colors
  family?: Family
  size?: Size
  weight?: Weight
}

export const useTypography = ({ color, family, size, weight }: HookTypographyParams) => (
  useMemo(() => clsx(
    colorsStyles.FontColor,
    color && colorsStyles[color],
    sizesStyles.FontSize,
    size && sizesStyles[size],
    weight && [weightsStyles[weight], weightsStyles.FontWeight],
    family === "Inter" && inter.className,
    family === "Rubik" && rubik.className,
    family === "WorkSans" && workSans.className,
  ), [color, family, size, weight])
)
