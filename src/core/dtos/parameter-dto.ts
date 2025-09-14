export type ParameterDto = {
  id?: string
  name: string
  unitOfMeasure: string
  numberOfDecimalPlaces: number
  factor: number
  offset: number
  createdAt?: Date
  updatedAt?: Date
  isActive?: boolean
}
