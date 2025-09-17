import { z } from 'zod'

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Formato de email inválido'),
})

export type UserFormData = z.infer<typeof userFormSchema>
