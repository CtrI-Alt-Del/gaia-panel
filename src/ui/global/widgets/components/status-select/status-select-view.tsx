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
  disabled?: boolean
  className?: string
  onValueChange?: (value: string) => void
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

export const StatusSelectView = ({
  value,
  disabled = false,
  className = '',
  onValueChange,
}: StatusSelectViewProps) => {
  const id = useId()

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
        <SelectTrigger className='w-fit'>
          <SelectValue placeholder='Selecione' />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
