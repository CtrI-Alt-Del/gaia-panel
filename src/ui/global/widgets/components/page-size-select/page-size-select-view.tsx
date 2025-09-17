import { useId } from 'react'
import { Label } from '@/ui/shadcn/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'

export type SelectOption = {
  value: string | number
  label: string
}

export type PageSizeSelectViewProps = {
  label: string
  options?: SelectOption[]
  value?: string | number
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  id?: string
  variant?: 'pagination' | 'custom'
  onValueChange?: (value: string) => void
}

const PAGINATION_OPTIONS: SelectOption[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
]

export const PageSizeSelectView = ({
  label,
  options,
  value,
  error,
  disabled = false,
  className = '',
  id: customId,
  variant = 'pagination',
  onValueChange,
}: PageSizeSelectViewProps) => {
  const generatedId = useId()
  const id = customId || generatedId
  const selectOptions = variant === 'pagination' ? PAGINATION_OPTIONS : options || []

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className='text-xs text-stone-600'>
        {label}
      </Label>
      <Select
        name='pageSize'
        defaultValue={value?.toString()}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} className='w-fit'>
          <SelectValue placeholder='Selecione' />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  )
}
