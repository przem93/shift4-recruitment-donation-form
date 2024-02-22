import { act, render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import '@/tests/mockReactHookForm.tsx'
import { FieldMonth } from "./index";

jest.mock('../../consts/currentDate', () => ({
  currentDate: new Date('2024-02-21'),
}))

describe('FieldMonth', () => {
  it('should render correct month and year', async () => {
    await act(async () => {
      render(<FieldMonth dataTestId="name" label="Label" name="name" />)
    })

    expect(screen.getByTestId('name.Month')).toHaveTextContent('February')
    expect(screen.getByTestId('name.Year')).toHaveTextContent('2024')
  })

  it('should render correct month after clicking next month button', async () => {
    await act(async () => {
      render(<FieldMonth dataTestId="name" label="Label" name="name" />)
    })

    expect(screen.getByTestId('name.Month')).toHaveTextContent('February')
    expect(screen.getByTestId('name.Year')).toHaveTextContent('2024')

    fireEvent.click(screen.getByTestId('name.NextMonth'))

    expect(screen.getByTestId('name.Month')).toHaveTextContent('March')
    expect(screen.getByTestId('name.Year')).toHaveTextContent('2024')
  })

  it('should render correct month after double clicking prev month button', async () => {
    await act(async () => {
      render(<FieldMonth dataTestId="name" label="Label" name="name" />)
    })

    expect(screen.getByTestId('name.Month')).toHaveTextContent('February')
    expect(screen.getByTestId('name.Year')).toHaveTextContent('2024')

    fireEvent.click(screen.getByTestId('name.PrevMonth'))
    fireEvent.click(screen.getByTestId('name.PrevMonth'))

    expect(screen.getByTestId('name.Month')).toHaveTextContent('December')
    expect(screen.getByTestId('name.Year')).toHaveTextContent('2023')
  })

  it('should render error when month is before min', async () => {
    await act(async () => {
      render(<FieldMonth dataTestId="name" label="Label" name="name" min={new Date('2022-01-01')} />)
    })

    fireEvent.click(screen.getByTestId('name.PrevMonth'))
    fireEvent.click(screen.getByTestId('name.PrevMonth'))

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
