import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  role: z.string().min(1, 'Role é obrigatório'),
})
