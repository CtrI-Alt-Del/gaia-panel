import { Form } from 'react-router'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'

interface AlarmsFiltersProps {
  searchValue: string
  statusValue: 'all' | 'active' | 'inactive'
  limit: number
}

export const AlarmsFilters = ({
  searchValue,
  statusValue,
  limit,
}: AlarmsFiltersProps) => {
  return (
    <div className='w-full'>
      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <Form method='get' replace className='flex flex-wrap items-end gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='q' className='text-xs text-stone-600'>
              Filtrar por nome
            </label>
            <Input
              id='q'
              name='q'
              defaultValue={searchValue}
              placeholder='Ex.: Temperatura'
              className='h-9 w-56'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='status' className='text-xs text-stone-600'>
              Status
            </label>
            <select
              id='status'
              name='status'
              defaultValue={statusValue}
              className='h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>Todos</option>
              <option value='active'>Ativos</option>
              <option value='inactive'>Inativos</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='limit' className='text-xs text-stone-600'>
              Itens por página
            </label>
            <select
              id='limit'
              name='limit'
              defaultValue={String(limit ?? 10)}
              className='h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-gray-500'
            >
              {[5, 10, 20, 50].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <Button type='submit' className='h-9'>
            Aplicar
          </Button>
        </Form>
      </div>
    </div>
  )
}
