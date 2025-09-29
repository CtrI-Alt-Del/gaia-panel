import { faker } from '@faker-js/faker'

import type { AlarmDto } from '../alarm-dto'
import type { AlarmLevel } from '../../types/alarm-level'
import type { AlarmRuleOperation } from '../../types/alarm-rule-operation'

export class AlarmsFaker {
  static fakeDto(baseDto?: Partial<AlarmDto>): AlarmDto {
    const alarmLevels: AlarmLevel[] = ['warning', 'critical']
    const alarmOperations: AlarmRuleOperation[] = ['GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUAL', 'LESS_THAN_OR_EQUAL', 'EQUAL']

    return {
      id: faker.string.uuid(),
      message: faker.lorem.sentence(),
      parameter: {
        id: faker.string.uuid(),
        entity: {
          name: faker.lorem.word(),
          unitOfMeasure: faker.helpers.arrayElement([
            '°C',
            '°F',
            'Pa',
            'bar',
            'psi',
            'V',
            'A',
            'W',
            'Hz',
            'm/s',
          ]),
        },
      },
      rule: {
        threshold: Number(faker.number.int({ min: 1, max: 1000 })),
        operation: faker.helpers.arrayElement(alarmOperations),
      },
      level: faker.helpers.arrayElement(alarmLevels),
      isActive: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...baseDto,
    }
  }

  static fakeMany(count: number = 10, baseDto?: Partial<AlarmDto>): AlarmDto[] {
    return Array.from({ length: count }, () => AlarmsFaker.fakeDto(baseDto))
  }
}
