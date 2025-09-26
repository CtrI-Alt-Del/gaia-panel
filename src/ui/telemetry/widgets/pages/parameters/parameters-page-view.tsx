import { Form } from 'react-router'

import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { Button } from '@/ui/shadcn/components/button'
import { Plus } from 'lucide-react'
import { PageSizeSelect } from '@/ui/global/widgets/components/page-size-select'
import { StatusSelect } from '@/ui/global/widgets/components/status-select'
import { ParameterNameSearchInput } from './parameter-name-search-input'
import { ParameterForm } from './parameter-form'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { ParametersTableView } from './parameters-table/parameters-table-view'

export type ParametersPageViewProps = {
  parameters: ParameterDto[]
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  isLoading?: boolean
  selectedParameter?: ParameterDto
  onEdit?: (id: string) => void
  onCloseModal?: () => void
  onParameterUpdated?: (parameter: ParameterDto) => void
}

export const ParametersPageView = ({
  parameters,
  nextCursor,
  previousCursor,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  selectedParameter,
  onEdit,
  onCloseModal,
  onParameterUpdated,
}: ParametersPageViewProps) => {
  return (
    <section className='container mx-auto px-4 py-2'>
      <div className='mb-6'>
        <div className='w-full'>
          <div className='rounded-lg border border-gray-200 bg-white p-4'>
            <Form
              preventScrollReset
              method='get'
              className='flex flex-wrap items-end gap-2'
            >
              <ParameterNameSearchInput label='Filtrar por nome' />
              <StatusSelect />
              <PageSizeSelect />
              <Button type='submit' className='h-9'>
                Aplicar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className='rounded-lg border border-stone-200'>
        <div className='flex items-center justify-between p-4 border-b border-stone-200'>
          <h2 className='text-lg font-medium'>Parâmetros</h2>
          <Dialog
            onClose={onCloseModal || (() => {})}
            title='Novo Parâmetro'
            description='Preencha os dados para criar um novo parâmetro'
            size='md'
            trigger={
              <Button className='flex items-center gap-2 h-9'>
                <Plus className='w-4 h-4' />
                Novo Parâmetro
              </Button>
            }
          >
            {(closeDialog) => (
              <ParameterForm onSuccess={closeDialog} onCancel={closeDialog} />
            )}
          </Dialog>
        </div>

        <ParametersTableView
          parameters={parameters}
          nextCursor={nextCursor}
          previousCursor={previousCursor}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          selectedParameter={selectedParameter}
          onEdit={onEdit}
          onCloseModal={onCloseModal}
          onParameterUpdated={onParameterUpdated}
        />
      </div>
    </section>
  )
}
