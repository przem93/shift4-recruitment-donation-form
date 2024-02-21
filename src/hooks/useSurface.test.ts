import type { HookSurfaceParams } from "./useSurface";
import { useSurface, surfaceBorders, surfaceBordersRadius, surfaceColors } from "./useSurface";
import { renderHook } from "@testing-library/react";

const renderSurfaceHook = (params: HookSurfaceParams) => {
  const { result: { current: classNames } } = renderHook(() => useSurface(params))

  return classNames
}

describe('useSurface', () => {
  describe('', () => {
    it('should generate correct classes for given border', () => {
      const classNames = renderSurfaceHook({
        border: surfaceBorders[0]
      })
      
      expect(classNames).toContain(surfaceBorders[0])
      expect(classNames).toContain('Border')
    })
  
    it('should generate correct classes for given borderRadius', () => {
      const classNames = renderSurfaceHook({
        borderRadius: surfaceBordersRadius[0]
      })
  
      expect(classNames).toContain(surfaceBordersRadius[0])
      expect(classNames).toContain('BorderRadius')
    })
  
    it('should generate correct classes for given color', () => {
      const classNames = renderSurfaceHook({
        color: surfaceColors[0]
      })
  
      expect(classNames).toContain(surfaceColors[0])
      expect(classNames).toContain('SurfaceColor')
    })
  
    it('should generate correct classes for a given elevation', () => {
      const classNames = renderSurfaceHook({
        elevation: 1
      })
  
      expect(classNames).toContain('Level-1')
      expect(classNames).toContain('Elevation')
    })
  })
  
  describe('combined', () => {
    it('should generate correct classes for combined border and color', () => {
      const classNames = renderSurfaceHook({
        border: surfaceBorders[0],
        color: surfaceColors[0]
      })
  
      expect(classNames).toContain(surfaceBorders[0])
      expect(classNames).toContain('Border')
      expect(classNames).toContain(surfaceColors[0])
      expect(classNames).toContain('SurfaceColor')
    })

    it('should generate correct classes for combined borderRadius and elevation', () => {
      const classNames = renderSurfaceHook({
        borderRadius: surfaceBordersRadius[0],
        elevation: 1
      })
  
      expect(classNames).toContain(surfaceBordersRadius[0])
      expect(classNames).toContain('BorderRadius')
      expect(classNames).toContain('Level-1')
      expect(classNames).toContain('Elevation')
    })
  })

  it('should handle no parameters', () => {
    const classNames = renderSurfaceHook({})

    expect(classNames).toBe('SurfaceColor')
  })

  it('should update classes correctly when parameters change', () => {
    const hook = renderHook(
      (props: HookSurfaceParams) => useSurface(props),
      { 
        initialProps: {
          borderRadius: surfaceBordersRadius[0],
          elevation: 1
        }
      }
    )

    const classNames = hook.result.current
    expect(classNames).toContain(surfaceBordersRadius[0])
    expect(classNames).toContain('BorderRadius')
    expect(classNames).toContain('Level-1')
    expect(classNames).toContain('Elevation')
    expect(classNames).toContain('SurfaceColor')

    hook.rerender({
      borderRadius: surfaceBordersRadius[1],
      elevation: 1,
      color: surfaceColors[2]
    })

    const updatedClassNames = hook.result.current
    expect(updatedClassNames).toContain(surfaceBordersRadius[1])
    expect(updatedClassNames).toContain('BorderRadius')
    expect(updatedClassNames).toContain('Level-1')
    expect(updatedClassNames).toContain('Elevation')
    expect(updatedClassNames).toContain(surfaceColors[2])
    expect(updatedClassNames).toContain('SurfaceColor')
  })
})
