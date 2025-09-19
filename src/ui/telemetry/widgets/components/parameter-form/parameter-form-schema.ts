import { z } from 'zod'

export const parameterFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  unitOfMeasure: z.string().min(1, 'Unidade de medida é obrigatória'),
  factor: z
    .number('Fator deve ser um número')
    .min(0.001, 'Fator deve ser maior que 0')
    .max(1000, 'Fator deve ser menor que 1000'),
  offset: z
    .number('Offset deve ser um número')
    .min(-1000, 'Offset deve ser maior que -1000')
    .max(1000, 'Offset deve ser menor que 1000'),
  isActive: z.boolean().default(true),
})

export type ParameterFormData = z.infer<typeof parameterFormSchema>
