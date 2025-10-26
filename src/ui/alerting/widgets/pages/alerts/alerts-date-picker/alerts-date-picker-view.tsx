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
  const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      // Format date as YYYY-MM-DD without timezone issues
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      onValueChange?.(formattedDate)
    } else {
      onValueChange?.(null)
    }
  }

  function handleClear() {
    onValueChange?.(null)
  }

  function formatDisplayDate(dateString: string) {
    // Parse the date string manually to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed
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
