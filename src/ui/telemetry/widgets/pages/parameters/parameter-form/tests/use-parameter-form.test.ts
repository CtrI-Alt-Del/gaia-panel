import { mock, type MockProxy } from 'vitest-mock-extended'
import { act, renderHook, waitFor } from '@testing-library/react'

import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'
import type { RestResponse } from '@/core/global/responses'

import { useParameterForm } from '../use-parameter-form'

// Helper para criar respostas mockadas
const createMockResponse = (overrides: Partial<RestResponse> = {}): RestResponse => ({
  isFailure: false,
  isSuccessful: true,
  statusCode: 200,
  errorMessage: undefined,
  ...overrides,
})

describe('useParameterForm', () => {
  let telemetryService: MockProxy<TelemetryService>
  let toastProvider: MockProxy<ToastProvider>
  let uiProvider: MockProxy<UiProvider>
  let onSuccessMock: ReturnType<typeof vi.fn>
  let onCancelMock: ReturnType<typeof vi.fn>

  const mockParameter: ParameterDto = {
    id: '1',
    name: 'Temperatura',
    unitOfMeasure: '°C',
    factor: 0.1,
    offset: 0.0, // Corrigido: offset deve ser >= 0
    isActive: true,
  }

  beforeEach(() => {
    telemetryService = mock<TelemetryService>()
    toastProvider = mock<ToastProvider>()
    uiProvider = mock<UiProvider>()
    onSuccessMock = vi.fn()
    onCancelMock = vi.fn()
  })

  // --- Inicialização ---
  describe('Form initialization', () => {
    it('inicializa com valores default quando nenhum parâmetro é fornecido', () => {
      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      expect(result.current.form.getValues()).toEqual({
        name: '',
        unitOfMeasure: '',
        factor: 1.0,
        offset: 0.0,
        isActive: true,
      })
    })

    it('inicializa com valores do parâmetro quando fornecido', () => {
      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          parameterDto: mockParameter,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      expect(result.current.form.getValues()).toEqual({
        name: mockParameter.name,
        unitOfMeasure: mockParameter.unitOfMeasure,
        factor: mockParameter.factor,
        offset: mockParameter.offset,
        isActive: mockParameter.isActive,
      })
    })
  })

  // --- Validação ---
  describe('Form validation', () => {
    it('retorna isValid como true para formulário válido', async () => {
      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.setValue('name', 'Temperatura')
        result.current.form.setValue('unitOfMeasure', '°C')
        result.current.form.setValue('factor', 0.1)
        result.current.form.setValue('offset', 0.0) // Corrigido: offset deve ser >= 0
        result.current.form.setValue('isActive', true)
        result.current.form.trigger() // Força a validação
      })

      await waitFor(() => expect(result.current.isValid).toBe(true))
    })

    it('retorna isValid como false para formulário inválido', () => {
      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.setValue('name', '')
        result.current.form.setValue('unitOfMeasure', '°C')
      })

      expect(result.current.isValid).toBe(false)
    })
  })

  // --- Cancelar ---
  describe('Cancel functionality', () => {
    it('chama onCancel ao executar handleCancel', () => {
      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.handleCancel()
      })

      expect(onCancelMock).toHaveBeenCalledTimes(1)
    })
  })

  // --- Criar parâmetro ---
  describe('Create parameter', () => {
    it('cria parâmetro com sucesso', async () => {
      telemetryService.createParameter.mockResolvedValue(
        createMockResponse({ isSuccessful: true }) as RestResponse<ParameterDto>,
      )

      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.reset({
          name: 'Temperatura',
          unitOfMeasure: '°C',
          factor: 0.1,
          offset: 0.0, // Corrigido: offset deve ser >= 0
          isActive: true,
        })
      })

      await act(async () => {
        await result.current.handleSubmit()
      })

      await waitFor(() => {
        expect(telemetryService.createParameter).toHaveBeenCalledWith({
          name: 'Temperatura',
          unitOfMeasure: '°C',
          factor: 0.1,
          offset: 0.0,
          isActive: true,
        })
        expect(toastProvider.showSuccess).toHaveBeenCalledWith(
          'Parâmetro criado com sucesso!',
        )
        expect(uiProvider.reload).toHaveBeenCalled()
        expect(onSuccessMock).toHaveBeenCalled()
      })
    })

    it('mostra erro ao falhar na criação', async () => {
      telemetryService.createParameter.mockResolvedValue(
        createMockResponse({
          isFailure: true,
          isSuccessful: false,
        }) as RestResponse<ParameterDto>,
      )

      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.reset({
          name: 'Temperatura',
          unitOfMeasure: '°C',
          factor: 0.1,
          offset: 0.0, // Corrigido: offset deve ser >= 0
          isActive: true,
        })
      })

      await act(async () => {
        await result.current.handleSubmit()
      })

      await waitFor(() => {
        expect(toastProvider.showError).toHaveBeenCalledWith('Erro ao salvar parâmetro')
        expect(onSuccessMock).not.toHaveBeenCalled()
      })
    })
  })

  // --- Atualizar parâmetro ---
  describe('Update parameter', () => {
    it('atualiza parâmetro com sucesso', async () => {
      telemetryService.updateParameter.mockResolvedValue(
        createMockResponse({ isSuccessful: true }) as RestResponse<ParameterDto>,
      )

      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          parameterDto: mockParameter,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.setValue('name', 'Temperatura Atualizada')
      })

      await act(async () => {
        await result.current.handleSubmit()
      })

      await waitFor(() => {
        expect(telemetryService.updateParameter).toHaveBeenCalledWith({
          name: 'Temperatura Atualizada',
          unitOfMeasure: mockParameter.unitOfMeasure,
          factor: mockParameter.factor,
          offset: mockParameter.offset,
          isActive: mockParameter.isActive,
          id: mockParameter.id,
        })
        expect(toastProvider.showSuccess).toHaveBeenCalledWith(
          'Parâmetro atualizado com sucesso!',
        )
        expect(uiProvider.reload).toHaveBeenCalled()
        expect(onSuccessMock).toHaveBeenCalled()
      })
    })

    it('mostra erro ao falhar na atualização', async () => {
      telemetryService.updateParameter.mockResolvedValue(
        createMockResponse({
          isFailure: true,
          isSuccessful: false,
        }) as RestResponse<ParameterDto>,
      )

      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          parameterDto: mockParameter,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      await act(async () => {
        await result.current.handleSubmit()
      })

      await waitFor(() => {
        expect(toastProvider.showError).toHaveBeenCalledWith('Erro ao salvar parâmetro')
        expect(onSuccessMock).not.toHaveBeenCalled()
      })
    })
  })

  // --- Erros inesperados ---
  describe('Error handling', () => {
    it('mostra erro quando service lança exceção', async () => {
      telemetryService.createParameter.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() =>
        useParameterForm({
          onSuccess: onSuccessMock,
          onCancel: onCancelMock,
          telemetryService,
          uiProvider,
          toastProvider,
        }),
      )

      act(() => {
        result.current.form.reset({
          name: 'Temperatura',
          unitOfMeasure: '°C',
          factor: 0.1,
          offset: 0.0, // Corrigido: offset deve ser >= 0
          isActive: true,
        })
      })

      await act(async () => {
        await result.current.handleSubmit()
      })

      await waitFor(() => {
        expect(toastProvider.showError).toHaveBeenCalledWith('Erro ao salvar parâmetro')
        expect(onSuccessMock).not.toHaveBeenCalled()
      })
    })
  })
})
