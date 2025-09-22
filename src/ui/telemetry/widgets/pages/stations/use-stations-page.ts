import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'
import type { StationFormData } from '../../../../telemetry/widgets/components/station/station-form'

// Mock de parâmetros disponíveis
const mockParameters: ParameterDto[] = [
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

const mockStations: StationDto[] = [
  {
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
  },
  {
    id: '2',
    name: 'Estação Norte',
    UID: 'EST002',
    latitude: -23.5,
    longitude: -46.6,
    lastReadAt: new Date(Date.now() - 1000 * 60 * 30),
    parameters: [
      {
        id: '3',
        name: 'Pressão Atmosférica',
        unitOfMeasure: 'hPa',
        factor: 0.1,
        offset: 300.0,
        isActive: true,
      },
    ],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function useStationsPage() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStation, setEditingStation] = useState<StationDto | null>(null)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  const q = params.get('q') ?? ''
  const status = (params.get('status') as any) ?? 'todos'
  const limit = Number(params.get('limit') ?? 10)
  const cur = params.get('cursor')

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(params)
    if (v === null || v === '') next.delete(k)
    else next.set(k, v)
    if (k !== 'cursor') next.delete('cursor')
    setParams(next, { replace: true })
  }

  const filteredStations = useMemo(() => {
    return mockStations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(q.toLowerCase()) ||
        station.UID.toLowerCase().includes(q.toLowerCase())
      const matchesStatus =
        status === 'todos' ||
        (status === 'ativo' && station.isActive) ||
        (status === 'inativo' && !station.isActive)
      return matchesSearch && matchesStatus
    })
  }, [q, status])

  const startIndex = cur ? parseInt(cur) : 0
  const endIndex = startIndex + limit
  const rows = filteredStations.slice(startIndex, endIndex)
  const total = filteredStations.length
  const cursor = {
    next: endIndex < filteredStations.length ? String(endIndex) : null,
    prev: startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null,
  }

  async function load() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)
  }

  const fromTo = useMemo(() => {
    const searchIndex = cur ? parseInt(cur) : 0
    const from = Math.min(total, searchIndex + 1)
    const to = Math.min(total, searchIndex + rows.length)
    return { from, to }
  }, [cur, total, rows.length])

  function timeAgo(d: Date) {
    const diff = Date.now() - new Date(d).getTime()
    if (diff < 60_000) return 'agora mesmo'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min atrás`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} h atrás`
    const days = Math.floor(diff / 86_400_000)
    return `${days}d atrás`
  }

  async function toggleStationActive(stationId: string) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    setLoading(false)
    console.log('Toggle station active:', stationId)
  }

  async function handleStationSubmit(data: StationFormData) {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (formMode === 'create') {
      const newStation: StationDto = {
        id: String(mockStations.length + 1),
        name: data.name,
        UID: data.UID,
        latitude: data.latitude,
        longitude: data.longitude,
        lastReadAt: new Date(),
        parameters: mockParameters.filter((p) => data.parameterIds.includes(p.id)),
        isActive: data.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockStations.push(newStation)
      console.log('Station created:', newStation)
    } else {
      // Simular edição da estação
      const stationIndex = mockStations.findIndex((s) => s.id === editingStation?.id)
      if (stationIndex !== -1) {
        mockStations[stationIndex] = {
          ...mockStations[stationIndex],
          name: data.name,
          UID: data.UID,
          latitude: data.latitude,
          longitude: data.longitude,
          isActive: data.isActive,
          parameters: mockParameters.filter((p) => data.parameterIds.includes(p.id)),
          updatedAt: new Date(),
        }
        console.log('Station updated:', mockStations[stationIndex])
      }
    }

    setLoading(false)
    setIsModalOpen(false)
    setEditingStation(null)
    setFormMode('create')
  }

  function handleNewStation() {
    setFormMode('create')
    setEditingStation(null)
    setIsModalOpen(true)
  }

  function handleEditStation(station: StationDto) {
    console.log('Editando estação:', station)
    setFormMode('edit')
    setEditingStation(station)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingStation(null)
    setFormMode('create')
  }

  return {
    loading,
    rows,
    total,
    cursor,
    q,
    status,
    limit,
    fromTo,
    isModalOpen,
    editingStation,
    formMode,
    availableParameters: mockParameters,
    setParam,
    load,
    timeAgo,
    toggleStationActive,
    onNewStation: handleNewStation,
    onEditStation: handleEditStation,
    onCloseModal: handleCloseModal,
    handleStationSubmit,
  }
}
