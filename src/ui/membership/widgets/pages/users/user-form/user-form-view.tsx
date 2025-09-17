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
import { useUserForm } from './use-user-form'
import type { UserFormData } from './user-form-schema'

type Props = {
  onSuccess?: (data: UserFormData) => void
  onCancel: () => void
}

export const UserFormView = ({ onSuccess, onCancel }: Props) => {
  const { form, handleSubmit, handleCancel, isSubmitting, isValid } = useUserForm({
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
                  <Input placeholder='Digite o nome completo' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Digite o email do usuário'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
