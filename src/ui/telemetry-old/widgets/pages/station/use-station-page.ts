import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'
import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'
import type { StationFormData } from '../../components/station/station-form/station-form'

// Mock de parâmetros disponíveis
const mockParameters = [
  {
    id: '1',
    name: 'Temperatura do Ar',
    unitOfMeasure: '°C',
    factor: 0.1,
    offset: -40.0,
    isActive: true,
  },
  {
    id: '2',
    name: 'Umidade Relativa',
    unitOfMeasure: '%',
    factor: 0.1,
    offset: 0.0,
    isActive: true,
  },
  {
    id: '3',
    name: 'Pressão Atmosférica',
    unitOfMeasure: 'hPa',
    factor: 0.1,
    offset: 300.0,
    isActive: true,
  },
  {
    id: '4',
    name: 'Velocidade do Vento',
    unitOfMeasure: 'm/s',
    factor: 0.1,
    offset: 0.0,
    isActive: true,
  },
  {
    id: '5',
    name: 'Direção do Vento',
    unitOfMeasure: '°',
    factor: 1.0,
    offset: 0.0,
    isActive: true,
  },
  {
    id: '6',
    name: 'Precipitação',
    unitOfMeasure: 'mm',
    factor: 0.1,
    offset: 0.0,
    isActive: true,
  },
]

const mockStation: StationDto = {
  id: '1',
  name: 'Estação Central',
  UID: 'EST001',
  latitude: -23.5505,
  longitude: -46.6333,
  lastReadAt: new Date(),
  parameters: [
    {
      id: '1',
      name: 'Temperatura do Ar',
      unitOfMeasure: '°C',
      factor: 0.1,
      offset: -40.0,
      isActive: true,
    },
    {
      id: '2',
      name: 'Umidade Relativa',
      unitOfMeasure: '%',
      factor: 0.1,
      offset: 0.0,
      isActive: true,
    },
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockMeasurements: MeasurementDto[] = [
  {
    id: '1',
    station: mockStation,
    parameter: mockStation.parameters[0],
    value: 25.5,
    measuredAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    station: mockStation,
    parameter: mockStation.parameters[1],
    value: 65.2,
    measuredAt: new Date(Date.now() - 1000 * 60 * 15),
  },
]

export function useStation() {
  const [tab, setTab] = useState<'details' | 'records' | 'parameters'>('details')
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const parameterId = searchParams.get('parameterId') ?? 'todos'
  const limit = Number(searchParams.get('limit') ?? 15)
  const cur = searchParams.get('cursor')

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (v === null || v === '') next.delete(k)
    else next.set(k, v)
    if (k !== 'cursor') next.delete('cursor')
    setSearchParams(next, { replace: true })
  }

  const filteredMeasurements = useMemo(() => {
    if (parameterId === 'todos') return mockMeasurements
    return mockMeasurements.filter((m) => m.parameter.id === parameterId)
  }, [parameterId])

  const startIndex = cur ? parseInt(cur) : 0
  const endIndex = startIndex + limit
  const rows = filteredMeasurements.slice(startIndex, endIndex)
  const cursor = {
    next: endIndex < filteredMeasurements.length ? String(endIndex) : null,
    prev: startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null,
  }

  async function loadStation() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)
  }

  async function loadRecords() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)
  }

  const uniqueParams = useMemo(() => {
    const set = new Map<string, string>()
    mockMeasurements.forEach((r) => {
      set.set(r.parameter.id, r.parameter.name)
    })
    return Array.from(set.entries()).map(([id, name]) => ({ id, name }))
  }, [])

  function timeAgo(d: Date) {
    const diff = Date.now() - new Date(d).getTime()
    if (diff < 60_000) return 'agora mesmo'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min atrás`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} h atrás`
    const days = Math.floor(diff / 86_400_000)
    return `${days}d atrás`
  }

  function formatDateTime(d: Date) {
    const dt = new Date(d)
    const dd = dt.toLocaleDateString('pt-BR')
    const hh = dt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `${dd} ${hh}`
  }

  async function toggleStationActive() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setLoading(false)
    console.log('Toggle station active')
  }

  function handleEditStation() {
    console.log('Editando estação na página de detalhes')
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleStationSubmit(data: StationFormData) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular atualização da estação
    console.log('Atualizando estação:', data)

    setLoading(false)
    setIsModalOpen(false)
  }

  return {
    station: mockStation,
    tab,
    loading,
    rows,
    cursor,
    parameterId,
    limit,
    uniqueParams,
    setTab,
    setParam,
    loadStation,
    loadRecords,
    timeAgo,
    formatDateTime,
    toggleStationActive,
    isModalOpen,
    onEditStation: handleEditStation,
    onCloseModal: handleCloseModal,
    handleStationSubmit,
    availableParameters: mockParameters,
  }
}
