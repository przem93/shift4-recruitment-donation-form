const numberFormatOptions = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  trailingZeroDisplay: "stripIfInteger"
}

const currencyFormatOptions = {
  ...numberFormatOptions,
  currency: "USD",
  style: "currency"
}

const monthFormatOptions = {
  month: "long"
} as const

const yearFormatOptions = {
  year: "numeric"
} as const

const dataFormatOptions = {
  ...monthFormatOptions,
  ...yearFormatOptions
}

export const numberFormatter = new Intl.NumberFormat("en-US", numberFormatOptions)
export const dateFormatter = new Intl.DateTimeFormat('en-US', dataFormatOptions)
export const monthFormatter = new Intl.DateTimeFormat('en-US', monthFormatOptions)
export const yearFormatter = new Intl.DateTimeFormat('en-US', yearFormatOptions)
export const currencyFormatter = new Intl.NumberFormat('en-US', currencyFormatOptions)
