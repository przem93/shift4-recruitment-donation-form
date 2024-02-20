import clsx from "clsx"
import { FieldErrors } from "react-hook-form"
import { useTypography } from "@/hooks/useTypography"
import { ErrorMessage } from "@hookform/error-message"
import { useSpaces } from "@/hooks/useSpaces"

interface Props {
  errors: FieldErrors
  name: string
}

export const FieldError = ({ name, errors }: Props) => {
  const typographyClassNames = useTypography({
    color: "Red",
    size: "XSmall",
  })
  const spacesClassNames = useSpaces({
    marginTop: 1
  })
  return <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <div className={clsx(typographyClassNames, spacesClassNames)}>{message}</div>}
  />
}