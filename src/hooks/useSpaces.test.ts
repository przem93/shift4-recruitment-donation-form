import type { HookSpacesParams } from "./useSpaces";
import { useSpaces } from "./useSpaces";
import { renderHook } from "@testing-library/react";

const renderSpacesHook = (params: HookSpacesParams) => {
  const { result: { current: classNames } } = renderHook(() => useSpaces(params))

  return classNames
}

const capitalizeFirstLetter = (value: string) => `${value.charAt(0).toLocaleUpperCase()}${value.slice(1, value.length)}`

describe('useSpaces', () => {
  describe('single parameter', () => {
    test.each([
      ['padding', 'Padding'],
      ['margin', 'Margin'],
    ])('should generate correct classes for given %s', (parameter, classNamePrefix) => {
      const classNames = renderSpacesHook({
        [parameter]: 1
      })
      
      expect(classNames).toContain(classNamePrefix)
      expect(classNames).toContain(`${classNamePrefix}Left-1`)
      expect(classNames).toContain(`${classNamePrefix}Right-1`)
      expect(classNames).toContain(`${classNamePrefix}Top-1`)
      expect(classNames).toContain(`${classNamePrefix}Bottom-1`)
    })

    test.each([
      ['paddingTop', 'Padding'],
      ['paddingRight', 'Padding'],
      ['paddingBottom', 'Padding'],
      ['paddingLeft', 'Padding'],
      ['marginTop', 'Margin'],
      ['marginRight', 'Margin'],
      ['marginBottom', 'Margin'],
      ['marginLeft', 'Margin'],
    ])('should generate correct classes for given %s', (parameter, classNamePrefix) => {
      const classNames = renderSpacesHook({
        [parameter]: 1
      })
      
      expect(classNames).toContain(`${capitalizeFirstLetter(parameter)}-1`)
      expect(classNames).toContain(classNamePrefix)
    })

    test.each([
      ['paddingHorizontal', 'Padding'],
      ['marginHorizontal', 'Margin'],
    ])('should generate correct classes for given %s', (parameter, classNamePrefix) => {
      const classNames = renderSpacesHook({
        [parameter]: 1
      })
      
      expect(classNames).toContain(`${classNamePrefix}Left-1`)
      expect(classNames).toContain(`${classNamePrefix}Right-1`)
      expect(classNames).toContain(classNamePrefix)
    })

    test.each([
      ['paddingVertical', 'Padding'],
      ['marginVertical', 'Margin'],
    ])('should generate correct classes for given %s', (parameter, classNamePrefix) => {
      const classNames = renderSpacesHook({
        [parameter]: 1
      })
      
      expect(classNames).toContain(`${classNamePrefix}Top-1`)
      expect(classNames).toContain(`${classNamePrefix}Bottom-1`)
      expect(classNames).toContain(classNamePrefix)
    })
  })
  
  it('should generate correct classes for combined padding and margin', () => {
      
  })

  it('should handle no parameters', () => {
    const classNames = renderSpacesHook({})

    expect(classNames).toBe('')
  })

  it('should update classes correctly when parameters change', () => {
    const hook = renderHook(
      (props: HookSpacesParams) => useSpaces(props),
      { 
        initialProps: {
          padding: 1,
          margin: 1
        }
      }
    )

    const classNames = hook.result.current
    expect(classNames).toContain('Padding')
    expect(classNames).toContain('PaddingLeft-1')
    expect(classNames).toContain('PaddingRight-1')
    expect(classNames).toContain('PaddingTop-1')
    expect(classNames).toContain('PaddingBottom-1')
    expect(classNames).toContain('Margin')
    expect(classNames).toContain('MarginLeft-1')
    expect(classNames).toContain('MarginTop-1')
    expect(classNames).toContain('MarginBottom-1')
    expect(classNames).toContain('MarginRight-1')

    hook.rerender({
      padding: 2,
      marginLeft: 2,
      marginRight: 2
    })

    const updatedClassNames = hook.result.current
    expect(updatedClassNames).toContain('Padding')
    expect(updatedClassNames).toContain('PaddingLeft-2')
    expect(updatedClassNames).toContain('PaddingRight-2')
    expect(updatedClassNames).toContain('PaddingTop-2')
    expect(updatedClassNames).toContain('PaddingBottom-2')
    expect(updatedClassNames).toContain('Margin')
    expect(updatedClassNames).toContain('MarginLeft-2')
    expect(updatedClassNames).toContain('MarginRight-2')
    expect(updatedClassNames).not.toContain('MarginBottom-2')
    expect(updatedClassNames).not.toContain('MarginTop-2')
  })
})
