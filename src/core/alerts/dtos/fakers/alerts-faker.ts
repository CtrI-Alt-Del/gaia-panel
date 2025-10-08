import { faker } from '@faker-js/faker'

import type { AlertDto } from '../alert-dto'

export class AlertsFaker {
  static fakeDto(baseDto?: Partial<AlertDto>): AlertDto {
    const alertLevels: string[] = ['critical', 'warning']
    const weatherParameters = [
      { name: 'Temperatura', unit: '°C' },
      { name: 'Umidade', unit: '%' },
      { name: 'Pressão Atmosférica', unit: 'hPa' },
      { name: 'Velocidade do Vento', unit: 'm/s' },
      { name: 'Direção do Vento', unit: '°' },
      { name: 'Precipitação', unit: 'mm/h' },
      { name: 'Visibilidade', unit: 'km' },
      { name: 'Índice UV', unit: 'UVI' },
      { name: 'Radiação Solar', unit: 'W/m²' },
      { name: 'Ponto de Orvalho', unit: '°C' },
    ]

    const parameter = faker.helpers.arrayElement(weatherParameters)
    const level = faker.helpers.arrayElement(alertLevels)

    const messages = {
      critical: [
        `Valor crítico detectado para ${parameter.name}`,
        `${parameter.name} atingiu limite perigoso`,
        `Alerta crítico: ${parameter.name} fora dos parâmetros seguros`,
        `Condição extrema detectada em ${parameter.name}`,
      ],
      warning: [
        `${parameter.name} próximo ao limite de atenção`,
        `Valor elevado detectado para ${parameter.name}`,
        `Monitoramento necessário: ${parameter.name}`,
        `${parameter.name} apresentando variação significativa`,
      ],
    }

    return {
      id: faker.string.uuid(),
      message: faker.helpers.arrayElement(messages[level as keyof typeof messages]),
      parameter: {
        id: faker.string.uuid(),
        entity: {
          name: parameter.name,
          unitOfMeasure: parameter.unit,
        },
      },
      level,
      createdAt: faker.date.past({ years: 1 }),
      ...baseDto,
    }
  }

  static fakeMany(count: number = 10, baseDto?: Partial<AlertDto>): AlertDto[] {
    return Array.from({ length: count }, () => AlertsFaker.fakeDto(baseDto))
  }
}
