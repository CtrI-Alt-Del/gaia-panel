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
import { Switch } from '@/ui/shadcn/components/switch'
import { useParameterForm } from './use-parameter-form'
import type { ParameterFormData } from './parameter-form-schema'

type Props = {
  onSuccess?: (data: ParameterFormData) => void
  onCancel: () => void
}

export const ParameterFormView = ({ onSuccess, onCancel }: Props) => {
  const { form, selectedIcon, handleSubmit, handleCancel, isSubmitting, isValid } =
    useParameterForm({
      onSuccess,
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
            name='unitOfMeasure'
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

          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Parâmetro Ativo</FormLabel>
                  <div className='text-sm text-muted-foreground'>
                    Define se o parâmetro está ativo no sistema
                  </div>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex gap-3 pt-4'>
            <Button type='submit' disabled={!isValid || isSubmitting} className='flex-1'>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              disabled={isSubmitting}
              className='flex-1'
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
