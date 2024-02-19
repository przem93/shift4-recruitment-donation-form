import { useMemo } from "react"
import clsx from "clsx"
import marginsStyles from "@/styles/spaces/margins.module.css"
import paddingsStyles from "@/styles/spaces/paddings.module.css"
import { Space } from "@/types/Space"

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

type Prefix = 'Margin' | 'Padding'

interface GetSpaceVariantParams {
  styles: typeof marginsStyles | typeof paddingsStyles
  classNamePrefix: Prefix
  all?: Space
  horizontal?: Space
  vertical?: Space
  top?: Space
  right?: Space
  bottom?: Space
  left?: Space
}

const constructClassName = (classNamePrefix: Prefix, place: 'Bottom' | 'Left' | 'Right' | 'Top', space: Space) => (
  `${classNamePrefix}${place}-${space}`
)

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
  (all || horizontal || vertical || top || right || bottom || left || all === 0 
    || horizontal === 0  || vertical === 0  || top === 0  || right === 0  || bottom === 0  || left === 0 ) && styles[classNamePrefix],
  bottom && styles[constructClassName(classNamePrefix, 'Bottom', bottom)],
  left && styles[constructClassName(classNamePrefix, 'Left', left)],
  right && styles[constructClassName(classNamePrefix, 'Right', right)],
  top && styles[constructClassName(classNamePrefix, 'Top', top)],
  all && [
    styles[constructClassName(classNamePrefix, 'Bottom', all)],
    styles[constructClassName(classNamePrefix, 'Left', all)],
    styles[constructClassName(classNamePrefix, 'Right', all)],
    styles[constructClassName(classNamePrefix, 'Top', all)],
  ],
  horizontal && [
    styles[constructClassName(classNamePrefix, 'Left', horizontal)],
    styles[constructClassName(classNamePrefix, 'Right', horizontal)],
  ],
  vertical && [
    styles[constructClassName(classNamePrefix, 'Bottom', vertical)],
    styles[constructClassName(classNamePrefix, 'Top', vertical)],
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
