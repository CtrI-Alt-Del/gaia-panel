import { useId } from 'react'
import { Label } from '@/ui/shadcn/components/label'
import { Input } from '@/ui/shadcn/components/input'

export type UserNameSearchInputViewProps = {
  label: string
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const UserNameSearchInputView = ({
  label,
  value,
  placeholder = 'Ex.: João Silva ou joao@email.com',
  disabled = false,
  className = '',
  id: customId,
}: UserNameSearchInputViewProps) => {
  const generatedId = useId()
  const id = customId || generatedId

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className='text-xs text-stone-600'>
        {label}
      </Label>
      <Input
        id={id}
        name='name'
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        className='h-9 w-64'
      />
    </div>
  )
}
