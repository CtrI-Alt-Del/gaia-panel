import { useId } from 'react'

import { Label } from '@/ui/shadcn/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'

export type StatusOption = {
  value: string
  label: string
}

export type StatusSelectViewProps = {
  value?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  id?: string
  onValueChange?: (value: string) => void
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

export const StatusSelectView = ({
  value,
  placeholder,
  error,
  disabled = false,
  className = '',
  id: customId,
  onValueChange,
}: StatusSelectViewProps) => {
  const generatedId = useId()
  const id = customId || generatedId

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className='text-xs text-stone-600'>
        Status
      </Label>
      <Select
        name='status'
        defaultValue={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} className='w-fit'>
          <SelectValue placeholder={placeholder || 'Selecione'} />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  )
}
