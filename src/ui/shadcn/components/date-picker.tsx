'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar } from './calendar'
export function Calendar22() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className='flex flex-col gap-3'>
      <Label htmlFor='date' className='px-1'>
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className='w-48 justify-between font-normal'
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
