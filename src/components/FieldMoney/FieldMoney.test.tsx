import '@/tests/mockReactHookForm.tsx'
import { FieldMoney } from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

describe('FieldMonth', () => {
  it('should correctly format value', async () => {
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)

    fireEvent.change(screen.getByTestId('field'), {
      target: {
        value: '4533'
      }
    })

    expect(screen.getByTestId('field')).toHaveValue('4,533')

    fireEvent.change(screen.getByTestId('field'), {
      target: {
        value: '4455533'
      }
    })

    expect(screen.getByTestId('field')).toHaveValue('4,455,533')

    fireEvent.change(screen.getByTestId('field'), {
      target: {
        value: '445,5533,456.44'
      }
    })

    expect(screen.getByTestId('field')).toHaveValue('4,455,533,456.44')
  })

  it('should show error when value is below min value', async () => {
    render(<FieldMoney dataTestId="field" label="Label" name="name" min={10} />)

    fireEvent.change(screen.getByTestId('field'), {
      target: {
        value: '4'
      }
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should clear value', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" min={10} />)
    const field = screen.getByTestId('field')

    await user.type(field, '44,44')
    await user.clear(field)
    
    expect(field).toHaveValue('')
  })

  it('should omit second decimal separator', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" min={10} />)
    const field = screen.getByTestId('field')

    await user.type(field, '44,44.')

    expect(field).toHaveValue('44.44')
  })

  it('should allow type only two decimal digits', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" min={10} />)
    const field = screen.getByTestId('field')

    await user.type(field, '44,4434')

    expect(field).toHaveValue('44.44')
  })

  it('should block keys different then numbers and decimal separator', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)
    const field = screen.getByTestId('field')

    await user.type(field, '4');
    expect(field).toHaveValue('4')

    await user.type(field, 'r');
    expect(field).toHaveValue('4')

    await user.type(field, '-');
    expect(field).toHaveValue('4')

    await user.type(field, '.');
    expect(field).toHaveValue('4.')

    await user.type(field, 'g');
    expect(field).toHaveValue('4.')

    await user.type(field, '5');
    expect(field).toHaveValue('4.5')

    await user.type(field, '55');
    expect(field).toHaveValue('4.55')
  })

  it('should accept typing comma and dot as decimal separator', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)
    const field = screen.getByTestId('field')

    await user.type(field, '44,44')
    expect(field).toHaveValue('44.44')

    await user.clear(field)
    expect(field).toHaveValue('')

    await user.type(field, '44.44')
    expect(field).toHaveValue('44.44')
  })

  it('should delete on blur decimal when it is equal to zero', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)
    const field = screen.getByTestId('field')

    await user.type(field, '4444.0')
    expect(field).toHaveValue('4,444.0')

    await user.tab()
    expect(field).toHaveValue('4,444')
  })

  it('should format to 2 decimal digits when it is different then zero', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)
    const field = screen.getByTestId('field')

    await user.type(field, '4444.3')
    expect(field).toHaveValue('4,444.3')
    
    await user.tab()
    expect(field).toHaveValue('4,444.30')
  })

  it('should keep cursor position', async () => {
    const user = userEvent.setup()
    render(<FieldMoney dataTestId="field" label="Label" name="name" />)
    const field = screen.getByTestId<HTMLInputElement>('field')

    await user.type(field, '4444.3')
    expect(field).toHaveValue('4,444.3')
    
    await user.type(field, '{ArrowLeft}{ArrowLeft}5')
    expect(field).toHaveValue('44,445.3')
    expect(field.selectionStart).toBe(6)

    await user.type(field, '{ArrowLeft}{ArrowLeft}55')
    expect(field).toHaveValue('4,444,555.3')
    expect(field.selectionStart).toBe(9)
  })
})
