import { CalendarIcon, X } from 'lucide-react'
import { Button } from '@/ui/shadcn/components/button'
import { Calendar } from '@/ui/shadcn/components/calendar'
import { Label } from '@/ui/shadcn/components/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/shadcn/components/popover'
import { cn } from '@/ui/shadcn/utils'

type AlertsDatePickerProps = {
  value?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const AlertsDatePickerView = ({
  value,
  onValueChange,
  placeholder = 'Selecionar data',
  className,
  disabled = false,
}: AlertsDatePickerProps) => {
  const selectedDate = value ? new Date(value) : undefined

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]
      onValueChange?.(formattedDate)
    } else {
      onValueChange?.(null)
    }
  }

  const handleClear = () => {
    onValueChange?.(null)
  }

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className={cn('min-w-[200px]', className)}>
      <Label htmlFor='date' className='text-sm font-medium text-gray-700'>
        Data
      </Label>
      <div className='mt-1 relative'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant='outline'
              className={cn(
                'w-full justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground',
                disabled && 'cursor-not-allowed opacity-50',
              )}
              disabled={disabled}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {selectedDate && value ? formatDisplayDate(value) : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              captionLayout='dropdown'
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {selectedDate && !disabled && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100'
            onClick={handleClear}
          >
            <X className='h-3 w-3' />
            <span className='sr-only'>Limpar data</span>
          </Button>
        )}
      </div>
    </div>
  )
}
