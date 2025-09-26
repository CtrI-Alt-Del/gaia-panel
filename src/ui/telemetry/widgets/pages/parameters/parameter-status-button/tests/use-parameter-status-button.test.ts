import { mock, type MockProxy } from 'vitest-mock-extended'
import { act, renderHook, waitFor } from '@testing-library/react'

import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'
import type { RestResponse } from '@/core/global/responses'

import { useParameterStatusButton } from '../use-parameter-status-button'

// Mock dos hooks
const mockTelemetryService = mock<TelemetryService>()
const mockUiProvider = mock<UiProvider>()
const mockToastProvider = mock<ToastProvider>()

vi.mock('@/ui/global/hooks/use-rest', () => ({
  useRest: vi.fn(() => ({
    telemetryService: mockTelemetryService,
  })),
}))

vi.mock('@/ui/global/hooks/use-ui-provider', () => ({
  useUiProvider: vi.fn(() => mockUiProvider),
}))

vi.mock('@/ui/global/hooks/use-toast', () => ({
  useToastProvider: vi.fn(() => mockToastProvider),
}))

// Helper function to create mock responses
const createMockResponse = (overrides: Partial<RestResponse> = {}): RestResponse => ({
  isFailure: false,
  isSuccessful: true,
  statusCode: 200,
  errorMessage: undefined,
  ...overrides,
})

describe('useParameterStatusButton', () => {
  let telemetryService: MockProxy<TelemetryService>
  let toastProvider: MockProxy<ToastProvider>
  let uiProvider: MockProxy<UiProvider>
  const parameterId = '1'
  const errorMessage = 'error message'

  beforeEach(() => {
    telemetryService = mockTelemetryService
    toastProvider = mockToastProvider
    uiProvider = mockUiProvider
    vi.clearAllMocks()
  })

  it('should try to deactivate parameter when parameter is active', async () => {
    telemetryService.deactivateParameter.mockResolvedValue(createMockResponse())

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: true,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(telemetryService.deactivateParameter).toHaveBeenCalledWith(parameterId)
    })
  })

  it('should try to activate parameter when parameter is inactive', async () => {
    telemetryService.activateParameter.mockResolvedValue(createMockResponse())

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: false,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(telemetryService.activateParameter).toHaveBeenCalledWith(parameterId)
    })
  })

  it('should show toast error when deactivate parameter fails', async () => {
    const errorResponse = createMockResponse({
      isFailure: true,
      isSuccessful: false,
      errorMessage: errorMessage,
      statusCode: 400,
    })
    telemetryService.deactivateParameter.mockResolvedValue(errorResponse)

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: true,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(toastProvider.showError).toHaveBeenCalledWith(
        `Erro ao alterar status do parâmetro: ${errorMessage}`,
      )
    })
  })

  it('should show toast error when activate parameter fails', async () => {
    const errorResponse = createMockResponse({
      isFailure: true,
      isSuccessful: false,
      errorMessage: errorMessage,
      statusCode: 400,
    })
    telemetryService.activateParameter.mockResolvedValue(errorResponse)

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: false,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(toastProvider.showError).toHaveBeenCalledWith(
        `Erro ao alterar status do parâmetro: ${errorMessage}`,
      )
    })
  })

  it('should show toast success and reload when deactivate parameter succeeds', async () => {
    const successResponse = createMockResponse({
      isFailure: false,
      isSuccessful: true,
      statusCode: 200,
    })
    telemetryService.deactivateParameter.mockResolvedValue(successResponse)

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: true,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(toastProvider.showSuccess).toHaveBeenCalledWith(
        'Parâmetro desativado com sucesso!',
      )
      expect(uiProvider.reload).toHaveBeenCalled()
    })
  })

  it('should show toast success and reload when activate parameter succeeds', async () => {
    const successResponse = createMockResponse({
      isFailure: false,
      isSuccessful: true,
      statusCode: 200,
    })
    telemetryService.activateParameter.mockResolvedValue(successResponse)

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: false,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(toastProvider.showSuccess).toHaveBeenCalledWith(
        'Parâmetro ativado com sucesso!',
      )
      expect(uiProvider.reload).toHaveBeenCalled()
    })
  })

  it('should show toast error when service throws exception', async () => {
    telemetryService.deactivateParameter.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() =>
      useParameterStatusButton({
        parameterId,
        isActive: true,
      }),
    )

    act(() => {
      result.current.handleToggle()
    })

    await waitFor(() => {
      expect(toastProvider.showError).toHaveBeenCalledWith(
        'Erro inesperado ao alterar status do parâmetro',
      )
    })
  })
})
