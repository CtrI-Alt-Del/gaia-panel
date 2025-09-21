import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const filtersSchema = z.object({
  q: z.string().optional(),
  isActive: z.enum(['all', 'active', 'inactive']),
  limit: z.number().min(5).max(50),
})

export type FiltersFormData = z.infer<typeof filtersSchema>

type UseParametersFiltersProps = {
  initialValues: {
    q: string
    isActive: string
    limit: number
  }
}

export function useParametersFilters({ initialValues }: UseParametersFiltersProps) {
  const form = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      q: initialValues.q || '',
      isActive: (initialValues.isActive as 'all' | 'active' | 'inactive') || 'all',
      limit: initialValues.limit || 10,
    } as FiltersFormData,
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  return {
    register,
    handleSubmit,
    watch,
    errors,
  }
}
