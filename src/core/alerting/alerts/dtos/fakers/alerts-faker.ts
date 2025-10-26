import { faker } from '@faker-js/faker'
import type { AlertDto } from '../alert-dto'

export class AlertsFaker {
  static fake(baseDto?: Partial<AlertDto>): AlertDto {
    return {
      id: faker.string.uuid(),
      level: faker.helpers.arrayElement(['WARNING', 'CRITICAL']),
      message: faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      measurementValue: faker.number.float(),
      parameterName: faker.lorem.word(),
      parameterUnitOfMeasure: faker.lorem.word(),
      parameterStationName: faker.lorem.word(),
      isRead: faker.datatype.boolean(),
      ...baseDto,
    }
  }

  static fakeMany(count: number, baseDto?: Partial<AlertDto>): AlertDto[] {
    return Array.from({ length: count }, () => AlertsFaker.fake(baseDto))
  }
}
