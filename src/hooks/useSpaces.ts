import { useMemo } from "react"
import clsx from "clsx"
import marginsStyles from "@/styles/spaces/margins.module.css"
import paddingsStyles from "@/styles/spaces/paddings.module.css"

type Space = 'XXSmall' | 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge' | 'XXLarge'

type SpacePropName = 'margin' | 'padding'


type DynamicKey<Key extends string, V> = {
  [K in Key]?: V
}

type SpaceVariant<
  PropName extends SpacePropName,
  All extends Space = never,
  Horizontal extends Space = never,
  Vertical extends Space = never,
  Top extends Space = never,
  Right extends Space = never,
  Bottom extends Space = never,
  Left extends Space = never
> = 
  DynamicKey<PropName, All>
  & DynamicKey<`${PropName}Horizontal`, Horizontal>
  & DynamicKey<`${PropName}Vertical`, Vertical>
  & DynamicKey<`${PropName}Top`, Top>
  & DynamicKey<`${PropName}Right`, Right>
  & DynamicKey<`${PropName}Bottom`, Bottom>
  & DynamicKey<`${PropName}Left`, Left>


type SpaceParams<PropName extends SpacePropName> = 
  SpaceVariant<PropName, Space>
  | SpaceVariant<PropName, never, Space, never, Space, never, Space>
  | SpaceVariant<PropName, never, never, Space, never, Space, never, Space>
  | SpaceVariant<PropName, never, Space, Space>
  | SpaceVariant<PropName, never, never, never, Space, Space, Space, Space>


type MarginParams = SpaceParams<'margin'>
type PaddingParams = SpaceParams<'padding'>

export type HookSpacesParams = MarginParams & PaddingParams

interface GetSpaceVariantParams {
  styles: typeof marginsStyles | typeof paddingsStyles
  classNamePrefix: 'Margin' | 'Padding'
  all?: Space
  horizontal?: Space
  vertical?: Space
  top?: Space
  right?: Space
  bottom?: Space
  left?: Space
}

const getSpacesVariant = ({
  styles,
  classNamePrefix,
  all,
  horizontal,
  vertical,
  top,
  right,
  bottom,
  left,
}: GetSpaceVariantParams) => [
  (all || horizontal || vertical || top || right || bottom || left) && styles[classNamePrefix],
  bottom && styles[`${classNamePrefix}Bottom${bottom}`],
  left && styles[`${classNamePrefix}Left${left}`],
  right && styles[`${classNamePrefix}Right${right}`],
  top && styles[`${classNamePrefix}Top${top}`],
  all && [
    styles[`${classNamePrefix}Bottom${all}`],
    styles[`${classNamePrefix}Left${all}`],
    styles[`${classNamePrefix}Right${all}`],
    styles[`${classNamePrefix}Top${all}`],
  ],
  horizontal && [
    styles[`${classNamePrefix}Left${horizontal}`],
    styles[`${classNamePrefix}Right${horizontal}`],
  ],
  vertical && [
    styles[`${classNamePrefix}Bottom${vertical}`],
    styles[`${classNamePrefix}Top${vertical}`],
  ]
]

export const useSpaces = ({
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  padding,
  paddingBottom,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical
}: HookSpacesParams) => (
  useMemo(() => clsx(
    ...getSpacesVariant({
      styles: marginsStyles,
      classNamePrefix: 'Margin',
      all: margin,
      horizontal: marginHorizontal,
      vertical: marginVertical,
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft
    }),
    ...getSpacesVariant({
      styles: paddingsStyles,
      classNamePrefix: 'Padding',
      all: padding,
      horizontal: paddingHorizontal,
      vertical: paddingVertical,
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft
    }),

  ), [
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical
  ])
)
