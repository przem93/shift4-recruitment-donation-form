import type { HookTypographyParams } from "./useTypography";
import { useTypography } from "./useTypography";
import { renderHook } from "@testing-library/react";

const renderTypographyHook = (params: HookTypographyParams) => {
  const { result: { current: classNames } } = renderHook(() => useTypography(params))

  return classNames
}

jest.mock('next/font/google', () => {
  return {
    Inter: () => ({
      className: 'Inter'
    }),
    Rubik: () => ({
      className: 'Rubik'
    }),
    Work_Sans: () => ({
      className: 'WorkSans'
    }),
  };
});

describe('useTypography', () => {
  describe('single parameter', () => {
    it('should generate correct classes for given color', () => {
      const classNames = renderTypographyHook({
        color: 'BlueGrey'
      })
      
      expect(classNames).toContain('FontColor')
      expect(classNames).toContain('BlueGrey')
    })
    it('should generate correct classes for given family', () => {
      const classNames = renderTypographyHook({
        family: 'Inter'
      })
      
      expect(classNames).toContain('Inter')
    })

    it('should generate correct classes for given size', () => {
      const classNames = renderTypographyHook({
        size: 'XLarge'
      })
      
      expect(classNames).toContain('FontSize')
      expect(classNames).toContain('XLarge')
    })

    it('should generate correct classes for given weight', () => {
      const classNames = renderTypographyHook({
        weight: 'Medium'
      })
      
      expect(classNames).toContain('FontWeight')
      expect(classNames).toContain('Medium')
    })
  })
  
  describe('combined parameters', () => {
    it('should generate correct classes for combined color and weight', () => {
      const classNames = renderTypographyHook({
        color: 'Red',
        weight: 'Medium'
      })
      
      expect(classNames).toContain('FontColor')
      expect(classNames).toContain('Red')
      expect(classNames).toContain('FontWeight')
      expect(classNames).toContain('Medium')
    })

    it('should generate correct classes for combined size and family', () => {
      const classNames = renderTypographyHook({
        family: 'WorkSans',
        size: 'XLarge'
      })
      
      expect(classNames).toContain('WorkSans')
      expect(classNames).toContain('FontSize')
      expect(classNames).toContain('XLarge')
    })
  })

  it('should handle no parameters', () => {
    const classNames = renderTypographyHook({})

    expect(classNames).toBe('FontColor FontSize')
  })

  it('should update classes correctly when parameters change', () => {
    const hook = renderHook(
      (props: HookTypographyParams) => useTypography(props),
      { 
        initialProps: {
          family: 'Rubik',
          weight: 'Light'
        }
      }
    )

    const classNames = hook.result.current
    expect(classNames).toContain('Rubik')
    expect(classNames).toContain('FontWeight')
    expect(classNames).toContain('Light')

    hook.rerender({
      size: 'XLarge',
      family: 'Inter',
      weight: 'Medium'
    })

    const updatedClassNames = hook.result.current
    expect(updatedClassNames).toContain('Inter')
    expect(updatedClassNames).toContain('FontWeight')
    expect(updatedClassNames).toContain('Medium')
    expect(updatedClassNames).toContain('FontSize')
    expect(updatedClassNames).toContain('XLarge')
  })
})
