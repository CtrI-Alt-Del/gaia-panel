import { useFetcher } from 'react-router'

import { Input } from '@/ui/shadcn/components/input'
import { Button } from '@/ui/shadcn/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/form'
import { useUserForm } from './use-user-form'
import type { UserDto } from '@/core/membership/dtos/user-dto'
import { ROUTES } from '@/core/global/constants/routes'
import type { MembershipService } from '@/core/membership/interfaces'
import type { ToastProvider, UiProvider } from '@/core/global/interfaces'

type Props = {
  onSuccess?: () => void
  onCancel: () => void
  userDto?: UserDto
  membershipService: MembershipService
  uiProvider: UiProvider
  toastProvider: ToastProvider
}

export const UserFormView = ({
  onSuccess,
  onCancel,
  userDto,
  membershipService,
  uiProvider,
  toastProvider,
}: Props) => {
  const fetcher = useFetcher()
  const isEdition = Boolean(userDto?.id)
  const { form, isValid, handleCancel, handleSubmit } = useUserForm({
    onSuccess,
    onCancel,
    userDto,
    membershipService,
    uiProvider,
    toastProvider,
  })

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <fetcher.Form method='post' className='space-y-4' onSubmit={handleSubmit}>
          {isEdition && userDto?.id && (
            <input type='hidden' name='id' value={userDto.id} />
          )}
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
            <Button
              type='submit'
              disabled={!isValid || fetcher.state === 'submitting'}
              className='flex-1'
            >
              {fetcher.state === 'submitting'
                ? 'Salvando...'
                : isEdition
                  ? 'Atualizar'
                  : 'Salvar'}
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              disabled={fetcher.state === 'submitting'}
              className='flex-1'
            >
              Cancelar
            </Button>
          </div>
        </fetcher.Form>
      </Form>
    </div>
  )
}
