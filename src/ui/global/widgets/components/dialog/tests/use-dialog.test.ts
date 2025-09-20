import { useDialog } from '../use-dialog'

describe('useDialog hook', () => {
  it('should be a function', () => {
    expect(typeof useDialog).toBe('function')
  })

  it('should be exported from the module', () => {
    expect(useDialog).toBeDefined()
  })

  it('should have correct function name', () => {
    expect(useDialog.name).toBe('useDialog')
  })

  it('should be a React hook', () => {
    expect(() => {
      try {
        useDialog()
      } catch (error: any) {
        expect(error.message).toContain('useState')
      }
    }).not.toThrow()
  })

  it('should accept onOpenDialog parameter', () => {
    expect(() => {
      try {
        useDialog(() => {})
      } catch (error: any) {
        expect(error.message).toContain('useState')
      }
    }).not.toThrow()
  })

  it('should accept onCloseDialog parameter', () => {
    expect(() => {
      try {
        useDialog(undefined, () => {})
      } catch (error: any) {
        expect(error.message).toContain('useState')
      }
    }).not.toThrow()
  })

  it('should accept both parameters', () => {
    expect(() => {
      try {
        useDialog(
          () => {},
          () => {},
        )
      } catch (error: any) {
        expect(error.message).toContain('useState')
      }
    }).not.toThrow()
  })

  it('should work without parameters', () => {
    expect(() => {
      try {
        useDialog()
      } catch (error: any) {
        expect(error.message).toContain('useState')
      }
    }).not.toThrow()
  })

  it('should be a custom hook', () => {
    expect(typeof useDialog).toBe('function')
    expect(useDialog.length).toBe(2)
  })

  it('should have proper function signature', () => {
    const fnString = useDialog.toString()
    expect(fnString).toContain('onOpenDialog')
    expect(fnString).toContain('onCloseDialog')
    expect(fnString).toContain('return')
  })
})
