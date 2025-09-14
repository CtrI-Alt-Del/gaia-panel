import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/ui/shadcn/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/form'
import { Input } from '@/ui/shadcn/components/input'
import { Textarea } from '@/ui/shadcn/components/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'

const createAlarmSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
  icon: z.string().min(1, { message: 'Selecione um ícone' }),
  condition: z.string().min(1, { message: 'Digite a condição do alarme' }),
  message: z.string().min(1, { message: 'Digite a mensagem do alarme' }),
  severity: z.enum(['alarm', 'critical', 'warning']),
  status: z.enum(['active', 'inactive']),
})

type CreateAlarmFormData = z.infer<typeof createAlarmSchema>

interface CreateAlarmFormProps {
  onClose: () => void
}

export function CreateAlarmForm({ onClose }: CreateAlarmFormProps) {
  const createAlarmForm = useForm<CreateAlarmFormData>({
    resolver: zodResolver(createAlarmSchema),
    defaultValues: {
      name: '',
      icon: '',
      condition: '',
      message: '',
      severity: 'alarm',
      status: 'active',
    },
  })

  async function handleCreateAlarm(data: CreateAlarmFormData) {
    console.log('Dados do alarme:', data)
    // await createAlarm(data)
    createAlarmForm.reset()
    onClose()
  }

  return (
    <Form {...createAlarmForm}>
      <form
        className='space-y-6'
        onSubmit={createAlarmForm.handleSubmit(handleCreateAlarm)}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={createAlarmForm.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Alarme</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Ex: Temperatura Alta' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createAlarmForm.control}
            name='icon'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ícone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione um ícone' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='thermometer'>Termômetro</SelectItem>
                    <SelectItem value='droplets'>Gotas</SelectItem>
                    <SelectItem value='cloud-rain'>Nuvem com chuva</SelectItem>
                    <SelectItem value='trending-up'>Seta para cima</SelectItem>
                    <SelectItem value='arrow-down'>Seta para baixo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={createAlarmForm.control}
          name='condition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Ex: Temperatura > 35°C' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createAlarmForm.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Ex: Temperatura acima do nível crítico'
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={createAlarmForm.control}
            name='severity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severidade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione a severidade' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='alarm'>Alarme</SelectItem>
                    <SelectItem value='critical'>Crítico</SelectItem>
                    <SelectItem value='warning'>Aviso</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createAlarmForm.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione o status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='active'>Ativo</SelectItem>
                    <SelectItem value='inactive'>Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200'>
          <Button type='button' variant='outline' onClick={onClose} className='px-6 py-2'>
            Cancelar
          </Button>
          <Button
            type='submit'
            className='px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white'
          >
            Criar Alarme
          </Button>
        </div>
      </form>
    </Form>
  )
}
