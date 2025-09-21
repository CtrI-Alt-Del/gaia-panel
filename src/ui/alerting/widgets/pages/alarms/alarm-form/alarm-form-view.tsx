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
import { AlertCircle, Bell, Settings } from 'lucide-react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { AlarmFormData } from './alarm-form-schema'

type AlarmFormViewProps = {
  register: UseFormRegister<AlarmFormData>
  errors: FieldErrors<AlarmFormData>
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

export const AlarmFormView = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
}: AlarmFormViewProps) => {
  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      {/* Mensagem do Alarme */}
      <div className='space-y-3'>
        <Label
          htmlFor='message'
          className='text-sm font-semibold text-gray-700 flex items-center gap-2'
        >
          Mensagem do Alarme
        </Label>
        <Textarea
          id='message'
          {...register('message')}
          placeholder='Digite a mensagem do alarme...'
          rows={4}
          className={`resize-none transition-all duration-200 ${
            errors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
          }`}
        />
        {errors.message && (
          <div className='flex items-center gap-2 text-red-600 text-sm'>
            <AlertCircle className='h-4 w-4' />
            <span>{errors.message.message}</span>
          </div>
        )}
      </div>

      {/* Nível e Operação */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <Label htmlFor='level' className='text-sm font-semibold text-gray-700'>
            Nível de Criticidade
          </Label>
          <Select {...register('level')}>
            <SelectTrigger
              className={`transition-all duration-200 ${
                errors.level
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
              <SelectValue placeholder='Selecione o nível' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='warning' className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full' />
                Aviso
              </SelectItem>
              <SelectItem value='critical' className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-red-500 rounded-full' />
                Crítico
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.level && (
            <div className='flex items-center gap-2 text-red-600 text-sm'>
              <AlertCircle className='h-4 w-4' />
              <span>{errors.level.message}</span>
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <Label htmlFor='operation' className='text-sm font-semibold text-gray-700'>
            Operação de Comparação
          </Label>
          <Select {...register('operation')}>
            <SelectTrigger
              className={`transition-all duration-200 ${
                errors.operation
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
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
            <div className='flex items-center gap-2 text-red-600 text-sm'>
              <AlertCircle className='h-4 w-4' />
              <span>{errors.operation.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-3'>
        <Label htmlFor='threshold' className='text-sm font-semibold text-gray-700'>
          Valor Limite
        </Label>
        <div className='relative'>
          <Input
            id='threshold'
            type='number'
            step='0.01'
            placeholder='Digite o valor limite...'
            {...register('threshold')}
            className={`transition-all duration-200 ${
              errors.threshold
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
        </div>
        {errors.threshold && (
          <div className='flex items-center gap-2 text-red-600 text-sm'>
            <AlertCircle className='h-4 w-4' />
            <span>{errors.threshold.message}</span>
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className='flex justify-end gap-3 pt-6 border-t border-gray-100'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isSubmitting}
          className='px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='px-6 py-2text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              Criando...
            </div>
          ) : (
            <div className='flex items-center gap-2'>Criar Alarme</div>
          )}
        </Button>
      </div>
    </form>
  )
}
