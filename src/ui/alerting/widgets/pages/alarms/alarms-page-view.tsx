import { Form } from 'react-router'

import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'
import { Button } from '@/ui/shadcn/components/button'
import { Bell, Plus } from 'lucide-react'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'
import { StatusSelect } from '@/ui/global/widgets/components/status-select'
import { AlarmLevelSelect } from './alarm-level-select'
import { AlarmForm } from './alarm-form'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { AlarmsTableView } from './alarms-table/alarms-table-view'

export type AlarmsPageViewProps = {
  alarms: AlarmDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedAlarm?: AlarmDto
  isAuthenticated?: boolean
  onEdit?: (id: string) => void
  onCloseModal?: () => void
  onAlarmUpdated?: (alarm: AlarmDto) => void
}

export const AlarmsPageView = ({
  alarms,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedAlarm,
  isAuthenticated,
  onEdit,
  onCloseModal,
}: AlarmsPageViewProps) => {
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
              <AlarmLevelSelect />
              <StatusSelect />
              <PageSizeSelect />
              <Button type='submit' className='h-9'>
                Aplicar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-card border border-stone-200'>
        <div className='flex items-end justify-start p-4 border-b border-stone-200'>
          {isAuthenticated && (
            <Dialog
              onClose={onCloseModal || (() => {})}
              title='Novo Alarme'
              icon={<Bell className='w-4 h-4' />}
              description='Preencha os dados para criar um novo alarme'
              size='lg'
              trigger={
                <Button className='flex items-center gap-2 h-9'>
                  <Plus className='w-4 h-4' />
                  Novo Alarme
                </Button>
              }
            >
              {(closeDialog) => (
                <AlarmForm onSuccess={closeDialog} onCancel={closeDialog} />
              )}
            </Dialog>
          )}
        </div>

        <AlarmsTableView
          alarms={alarms}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          selectedAlarm={selectedAlarm}
          onEdit={onEdit}
          onCloseModal={onCloseModal}
        />
      </div>
    </div>
  )
}
