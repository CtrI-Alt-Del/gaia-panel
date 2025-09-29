import { useState } from 'react'
import { type useForm, Controller } from 'react-hook-form'

import { Button } from '@/ui/shadcn/components/button'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import { Textarea } from '@/ui/shadcn/components/textarea'
import { AlertCircle, ChevronDown, ChevronLeft, ChevronRight, Edit } from 'lucide-react'
import type { AlarmFormData } from './alarm-form-schema'
import { ParameterSelectorSheet } from './parameter-selector-sheet'

type AlarmFormViewProps = {
  form: ReturnType<typeof useForm<AlarmFormData>>
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export const AlarmFormView = ({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: AlarmFormViewProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = form
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const selectedStationId = watch('stationId')
  const [selectedStationName, setSelectedStationName] = useState('')
  const [selectedParameterName, setSelectedParameterName] = useState('')

  return (
    <>
      <form onSubmit={onSubmit} className='space-y-6'>
        <div className='space-y-3'>
          <Label className='text-sm font-semibold text-gray-700'>
            Estação e Parâmetro
          </Label>
          {selectedStationId ? (
            <div className='flex items-center justify-between p-3 border rounded-md bg-gray-50'>
              <div>
                <p className='text-sm font-medium'>{selectedStationName}</p>
                <p className='text-xs text-gray-500'>{selectedParameterName}</p>
              </div>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => setIsSheetOpen(true)}
              >
                <Edit className='w-4 h-4 mr-2' />
                Alterar
              </Button>
            </div>
          ) : (
            <Button
              type='button'
              variant='outline'
              className='w-full justify-between items-center gap-2 text-gray-500'
              onClick={() => setIsSheetOpen(true)}
            >
              Clique para selecionar uma estação e um parâmetro
              <ChevronRight className='w-4 h-4 ml-2' />
            </Button>
          )}
          {(errors.stationId || errors.parameterId) && (
            <div className='flex items-center gap-2 text-red-600 text-sm mt-1'>
              <AlertCircle className='h-4 w-4' />
              <span>{errors.stationId?.message || errors.parameterId?.message}</span>
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <Label htmlFor='message'>Mensagem do Alarme</Label>
          <Textarea
            id='message'
            {...register('message')}
            placeholder='Ex: Temperatura da Estação X excedeu o limite.'
            className={errors.message ? 'border-red-500' : ''}
          />
          {errors.message && (
            <p className='text-sm text-red-600'>{errors.message.message}</p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <Controller
            name='level'
            control={control}
            render={({ field }) => (
              <div className='space-y-3 w-full'>
                <Label>Nível de Criticidade</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione o nível' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='warning'>Aviso</SelectItem>
                    <SelectItem value='critical'>Crítico</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className='text-sm text-red-600'>{errors.level.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name='operation'
            control={control}
            render={({ field }) => (
              <div className='space-y-3'>
                <Label>Operação de Comparação</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione a operação' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='>'>Maior que (&gt;)</SelectItem>
                    <SelectItem value='>='>Maior ou igual (&gt;=)</SelectItem>
                    <SelectItem value='<'>Menor que (&lt;)</SelectItem>
                    <SelectItem value='<='>Menor ou igual (&lt;=)</SelectItem>
                    <SelectItem value='=='>Igual a (==)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.operation && (
                  <p className='text-sm text-red-600'>{errors.operation.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className='space-y-3'>
          <Label htmlFor='threshold'>Valor Limite</Label>
          <Input
            id='threshold'
            type='number'
            step='any'
            placeholder='Digite o valor...'
            {...register('threshold')}
            className={errors.threshold ? 'border-red-500' : ''}
          />
          {errors.threshold && (
            <p className='text-sm text-red-600'>{errors.threshold.message}</p>
          )}
        </div>

        <div className='flex justify-end gap-3 pt-4 border-t'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Alarme'}
          </Button>
        </div>
      </form>

      <ParameterSelectorSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSelect={(station, parameter) => {
          setValue('stationId', station.id as string, { shouldValidate: true })
          setValue('parameterId', parameter.id as string, { shouldValidate: true })
          setSelectedStationName(station.name)
          setSelectedParameterName(`${parameter.name} (${parameter.unitOfMeasure})`)
        }}
      />
    </>
  )
}
