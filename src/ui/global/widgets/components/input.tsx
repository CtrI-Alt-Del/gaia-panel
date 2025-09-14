import { useId } from 'react'

import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'

export default function InputComponent({
  label,
  placeholder,
  icon,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  icon?: React.ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const id = useId()
  return (
    <div className='*:not-first:mt-2'>
      <Label htmlFor={id}>{label}</Label>
      <div className='relative'>
        <Input
          id={id}
          className={icon ? 'peer ps-9' : 'peer'}
          placeholder={placeholder}
          type='text'
          value={value}
          onChange={onChange}
        />
        {icon && (
          <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
