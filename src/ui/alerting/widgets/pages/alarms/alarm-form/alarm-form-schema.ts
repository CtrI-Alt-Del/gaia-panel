import { z } from 'zod'

export const alarmFormSchema = z.object({
  stationId: z.string().min(1, 'É obrigatório selecionar uma estação'),
  parameterId: z.string().min(1, 'É obrigatório selecionar um parâmetro'),
  message: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .min(3, 'Mensagem deve ter pelo menos 3 caracteres')
    .max(500, 'Mensagem deve ter no máximo 500 caracteres'),

  level: z.enum(['warning', 'critical'], {
    message: 'Nível é obrigatório',
  }),

  operation: z.enum(['>', '<', '>=', '<=', '=='], {
    message: 'Operação é obrigatória',
  }),

  threshold: z
    .string()
    .min(1, 'Limite é obrigatório')
    .refine((val) => !Number.isNaN(parseFloat(val)), 'Limite deve ser um número válido')
    .refine((val) => parseFloat(val) > 0, 'Limite deve ser maior que zero'),
})

export type AlarmFormData = z.infer<typeof alarmFormSchema>
