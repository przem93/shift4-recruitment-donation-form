import { useCallback, useState } from "react"

interface HookFormContextParams {
  name: string
  defaultValue: unknown
  rules: {
    validate: (value: unknown) => boolean | string
  }
}

interface FieldErrorProps {
  name: string
  errors: Record<string, any>
}

jest.mock('../components/FieldError', () => ({
  FieldError: ({ name, errors }: FieldErrorProps) => <div role="alert">
    {errors.root?.[name]}
  </div>
}))

jest.mock('react-hook-form', () => ({
  useFormContext: () => ({
    control: {}
  }),
  useController: (params: HookFormContextParams) => {
    const {
      name,
      defaultValue,
      rules: {
        validate
      }
    } = params
    const [value, setValue] = useState(defaultValue)
    const [errors, setErrors] = useState<Record<string, any>>({})
  
    const onChange = useCallback((val: unknown) => {
      setValue(val)
      if (validate) {
        const validation = validate(val)
        if (!errors[name] && typeof validation === 'string') {
          setErrors({
            root: {
              [name]: validation
            }
          })
        } else if (errors[name] && !validation) {
          setErrors({})
        }
      }
    }, [errors, name, validate])
  
    return {
      field: {
        onChange,
        ref: () => {},
        value,
      },
      formState: {
        errors
      }
    }
  }
}))
