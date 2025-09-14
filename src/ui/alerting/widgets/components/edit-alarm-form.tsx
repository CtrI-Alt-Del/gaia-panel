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
import type { AlarmRule } from '../pages/use-alarms'

const editAlarmSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
  icon: z.string().min(1, { message: 'Selecione um ícone' }),
  condition: z.string().min(1, { message: 'Digite a condição do alarme' }),
  conditionLabel: z.string().optional(),
  message: z.string().min(1, { message: 'Digite a mensagem do alarme' }),
  messageLabel: z.string().optional(),
  severity: z.enum(['alarm', 'critical', 'warning']),
  target: z.string().min(1, { message: 'Digite o alvo do alarme' }),
  targetLabel: z.string().optional(),
  status: z.enum(['active', 'inactive']),
})

type EditAlarmFormData = z.infer<typeof editAlarmSchema>

interface EditAlarmFormProps {
  alarm: AlarmRule
  onClose: () => void
  onSave: (data: EditAlarmFormData) => void
}

export function EditAlarmForm({ alarm, onClose, onSave }: EditAlarmFormProps) {
  const editAlarmForm = useForm<EditAlarmFormData>({
    resolver: zodResolver(editAlarmSchema),
    defaultValues: {
      name: alarm.name,
      icon: alarm.icon,
      condition: alarm.condition,
      conditionLabel: alarm.conditionLabel,
      message: alarm.message,
      messageLabel: alarm.messageLabel,
      severity: alarm.severity,
      target: alarm.target,
      targetLabel: alarm.targetLabel,
      status: alarm.status,
    },
  })

  async function handleEditAlarm(data: EditAlarmFormData) {
    console.log('Dados do alarme editado:', data)
    onSave(data)
    editAlarmForm.reset()
    onClose()
  }

  return (
    <Form {...editAlarmForm}>
      <form className='space-y-6' onSubmit={editAlarmForm.handleSubmit(handleEditAlarm)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={editAlarmForm.control}
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
            control={editAlarmForm.control}
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={editAlarmForm.control}
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
            control={editAlarmForm.control}
            name='conditionLabel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rótulo da Condição (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Ex: Condição de temperatura' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-2'>
          <FormField
            control={editAlarmForm.control}
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

          <FormField
            control={editAlarmForm.control}
            name='messageLabel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rótulo da Mensagem (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Ex: Descrição da mensagem' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={editAlarmForm.control}
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
            control={editAlarmForm.control}
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={editAlarmForm.control}
            name='target'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alvo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Ex: Todas as Estações' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={editAlarmForm.control}
            name='targetLabel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rótulo do Alvo (opcional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Ex: Descrição do alvo' />
                </FormControl>
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
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Form>
  )
}
