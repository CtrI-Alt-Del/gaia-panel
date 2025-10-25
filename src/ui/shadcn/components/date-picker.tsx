import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar } from './calendar'
import { useDateTimeProvider } from '@/ui/global/hooks'

type Props = {
  defaultValue?: Date
  name: string
  onChange?: (date: Date) => void
}

export function DatePicker({ defaultValue, name, onChange }: Props) {
  const { localizeDate, formatDate } = useDateTimeProvider()
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? localizeDate(defaultValue) : undefined,
  )

  return (
    <div className='flex flex-col gap-1'>
      <Label htmlFor='date'>Data</Label>
      <input type='hidden' name={name} value={date?.toISOString()} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            id='date'
            className='w-48 border justify-between font-normal hover:bg-transparent'
          >
            {date ? formatDate(date) : 'Selecionar data'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0 z-50' align='start'>
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
              if (date && onChange) onChange(date)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
