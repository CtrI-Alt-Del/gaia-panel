import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'

export type StationDto = {
  id: string
  name: string
  UID: string
  latitude: number
  longitude: number
  lastReadAt: Date
  parameters: ParameterDto[]
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
