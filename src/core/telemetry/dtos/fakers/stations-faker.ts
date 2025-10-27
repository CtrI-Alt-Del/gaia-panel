import { faker } from '@faker-js/faker'

import type { StationDto } from '@/core/telemetry/dtos/station-dto'

export class StationsFaker {
  static fake(baseDto?: Partial<StationDto>): StationDto {
    return {
      name: `${faker.location.city()} Weather Station`,
      uid: faker.string.alphanumeric(8).toUpperCase(),
      address: faker.location.streetAddress(true),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      lastReadAt: faker.date.recent(),
      isActive: true,
      quantityOfParameters: faker.number.int({ min: 1, max: 5 }),
      ...baseDto,
    }
  }

  static fakeMany(count: number, baseDto?: Partial<StationDto>): StationDto[] {
    return Array.from({ length: count }, () => StationsFaker.fake(baseDto))
  }
}
