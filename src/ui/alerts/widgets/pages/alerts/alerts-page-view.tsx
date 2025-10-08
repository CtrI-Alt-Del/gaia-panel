import { Form } from 'react-router'
import type { AlertDto } from '@/core/alerts/dtos/alert-dto'
import { Button } from '@/ui/shadcn/components/button'
import { Bell } from 'lucide-react'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'
import { AlertsTable } from './alerts-table/index'
import { AlertsDatePicker } from './alerts-date-picker'
import { AlertsLevelSelect } from './alerts-level-select'

export type AlertsPageViewProps = {
  alerts: AlertDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  alertsStats?: {
    total: number
    critical: number
    warning: number
    filtered: number
  }
  filters?: {
    level: string | null
    date: string | null
    pageSize: string
  }
  onLevelFilter?: (level: string | null) => void
  onDateFilter?: (date: string | null) => void
  onPageSizeChange?: (pageSize: string) => void
  onClearFilters?: () => void
}

export const AlertsPageView = ({
  alerts,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  onClearFilters,
}: AlertsPageViewProps) => {
  return (
    <div className='container mx-auto px-4 py-2'>
      <div className='mb-6'>
        <div className='w-full'>
          <div className='rounded-lg border border-gray-200 bg-white p-4'>
            <Form
              preventScrollReset
              method='get'
              className='flex flex-wrap items-end gap-2'
            >
              <AlertsLevelSelect />
              <AlertsDatePicker />
              <PageSizeSelect />
              <Button type='submit' className='h-9'>
                Aplicar
              </Button>
              {onClearFilters && (
                <Button
                  type='button'
                  variant='outline'
                  className='h-9'
                  onClick={onClearFilters}
                >
                  Limpar Filtros
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-card border border-stone-200'>
        <div className='flex items-end justify-start p-4 border-b border-stone-200'>
          <div className='flex items-center gap-2'>
            <Bell className='w-5 h-5 text-stone-600' />
            <h2 className='text-lg font-semibold text-stone-800'>Alertas do Sistema</h2>
          </div>
        </div>

        <AlertsTable
          alerts={alerts}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
