import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/form'
import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import { useParameterForm } from './use-parameter-form'
import type { ParameterDto } from '@/core/dtos/telemetry/parameter-dto'

type Props = {
  parameter?: ParameterDto
  onCancel: () => void
  onUpdated?: (parameter: ParameterDto) => void
}

export const ParameterFormView = ({ parameter, onCancel, onUpdated }: Props) => {
  const { form, selectedIcon, handleSubmit, isEditMode } = useParameterForm({
    parameter,
    onUpdated,
    onCancel,
  })

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o nome do parâmetro' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='unit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade de Medida</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-3'>
                    <Input placeholder='Ex: °C, %, hPa, m/s' {...field} />
                    <div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg border'>
                      <span
                        className={`inline-flex size-8 items-center justify-center rounded-lg ring-1 ${selectedIcon.badgeColor}`}
                      >
                        <selectedIcon.Icon
                          className={`size-4 ${selectedIcon.iconColor}`}
                        />
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='factor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fator</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.001'
                      placeholder='1.0'
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='offset'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offset</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.1'
                      placeholder='0.0'
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <Button type='submit' className='flex-1'>
              {isEditMode ? 'Atualizar' : 'Salvar'}
            </Button>

            <Button type='button' variant='outline' onClick={onCancel} className='flex-1'>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
