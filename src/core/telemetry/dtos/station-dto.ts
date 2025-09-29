export type StationDto = {
  id?: string
  name: string
  uid: string
  latitude: number
  longitude: number
  quantityOfParameters?: number
  address: string
  lastReadAt?: Date
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
