import { z } from 'zod'

export const parameterSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  code: z.string().min(1, 'Código é obrigatório'),
  unitOfMeasure: z.string().min(1, 'Unidade de medida é obrigatória'),
  factor: z.number().min(0.01, 'Fator deve ser maior que zero'),
  offset: z.number().min(0, 'Offset deve ser maior ou igual a zero'),
  isActive: z.boolean().default(true),
})
