import { faker } from '@faker-js/faker'

import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'

const parameterNames = [
  'Temperatura',
  'Umidade Relativa',
  'Pressão Atmosférica',
  'Velocidade do Vento',
  'Direção do Vento',
  'Precipitação',
  'Radiação Solar',
  'Índice UV',
  'Visibilidade',
  'Ponto de Orvalho',
]

const units = ['°C', '%', 'hPa', 'm/s', '°', 'mm', 'W/m²', 'índice', 'km', '°C']

export class ParametersFaker {
  static fakeDto(baseDto?: Partial<ParameterDto>): ParameterDto {
    const randomName = faker.helpers.arrayElement(parameterNames)
    const randomUnit = faker.helpers.arrayElement(units)

    return {
      id: faker.string.uuid(),
      name: randomName,
      code: faker.string.uuid(),
      unitOfMeasure: randomUnit,
      factor: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
      offset: faker.number.float({ min: -100, max: 100, fractionDigits: 2 }),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...baseDto,
    } as ParameterDto
  }

  static fakeMany(count: number = 10, baseDto?: Partial<ParameterDto>): ParameterDto[] {
    return Array.from({ length: count }, () => ParametersFaker.fakeDto(baseDto))
  }
}
