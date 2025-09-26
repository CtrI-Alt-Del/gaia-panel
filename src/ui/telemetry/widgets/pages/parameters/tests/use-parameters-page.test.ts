import { renderHook, act } from '@testing-library/react'
import { useParametersPage } from '../use-parameters-page'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { ParametersFaker } from '@/core/telemetry/dtos/fakers/parameters-faker'

// Mock do react-router
const mockNavigate = vi.fn()
const mockSearchParams = new URLSearchParams()

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams],
}))

describe('useParametersPage hook', () => {
  const parameters: ParameterDto[] = [
    ParametersFaker.fakeDto({ id: '1', name: 'Temperatura', unitOfMeasure: '°C' }),
    ParametersFaker.fakeDto({
      id: '2',
      name: 'Umidade',
      unitOfMeasure: '%',
      isActive: false,
    }),
    ParametersFaker.fakeDto({ id: '3', name: 'Pressão', unitOfMeasure: 'hPa' }),
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
    // Clear all search params by creating a new URLSearchParams
    const newSearchParams = new URLSearchParams()
    Object.setPrototypeOf(mockSearchParams, newSearchParams)
    Object.assign(mockSearchParams, newSearchParams)
  })

  it('should initialize with undefined selectedParameter', () => {
    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toBeUndefined()
    expect(typeof result.current.handleEdit).toBe('function')
    expect(typeof result.current.handleCloseModal).toBe('function')
  })

  it('should set selectedParameter when editParameter query param exists', () => {
    mockSearchParams.set('editParameter', '1')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toEqual(parameters[0])
  })

  it('should set selectedParameter when editParameter query param exists with different id', () => {
    mockSearchParams.set('editParameter', '2')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toEqual(parameters[1])
  })

  it('should return undefined when editParameter query param does not match any parameter', () => {
    mockSearchParams.set('editParameter', '999')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toBeUndefined()
  })

  it('should call navigate with editParameter query param when handleEdit is called', () => {
    const { result } = renderHook(() => useParametersPage({ parameters }))

    act(() => {
      result.current.handleEdit('1')
    })

    expect(mockNavigate).toHaveBeenCalledWith('?editParameter=1', { replace: true })
  })

  it('should call navigate with editParameter query param when handleEdit is called with different id', () => {
    const { result } = renderHook(() => useParametersPage({ parameters }))

    act(() => {
      result.current.handleEdit('2')
    })

    expect(mockNavigate).toHaveBeenCalledWith('?editParameter=2', { replace: true })
  })

  it('should preserve existing query params when handleEdit is called', () => {
    mockSearchParams.set('status', 'active')
    mockSearchParams.set('search', 'temp')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    act(() => {
      result.current.handleEdit('1')
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      '?editParameter=1&status=active&search=temp',
      { replace: true },
    )
  })

  it('should call navigate without editParameter query param when handleCloseModal is called', () => {
    mockSearchParams.set('editParameter', '1')
    mockSearchParams.set('status', 'active')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    act(() => {
      result.current.handleCloseModal()
    })

    expect(mockNavigate).toHaveBeenCalledWith('?status=active&search=temp', {
      replace: true,
    })
  })

  it('should call navigate with empty query string when handleCloseModal is called and no other params exist', () => {
    mockSearchParams.set('editParameter', '1')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    act(() => {
      result.current.handleCloseModal()
    })

    expect(mockNavigate).toHaveBeenCalledWith('?status=active&search=temp', {
      replace: true,
    })
  })

  it('should handle string id comparison correctly', () => {
    // Test with numeric string id
    mockSearchParams.set('editParameter', '1')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toEqual(parameters[0])
  })

  it('should return undefined when editParameter query param is empty string', () => {
    mockSearchParams.set('editParameter', '')

    const { result } = renderHook(() => useParametersPage({ parameters }))

    expect(result.current.selectedParameter).toBeUndefined()
  })
})
