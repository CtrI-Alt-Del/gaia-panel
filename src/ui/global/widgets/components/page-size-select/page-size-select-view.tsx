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
  value?: string | number
  className?: string
}

const PAGINATION_OPTIONS: SelectOption[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
]

export const PageSizeSelectView = ({
  value,
  className = '',
}: PageSizeSelectViewProps) => {
  const id = useId()

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className='text-xs text-stone-600'>
        Itens por página
      </Label>
      <Select name='pageSize' defaultValue={value?.toString()}>
        <SelectTrigger id={id} className='w-fit'>
          <SelectValue placeholder='Selecione' />
        </SelectTrigger>
        <SelectContent>
          {PAGINATION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
