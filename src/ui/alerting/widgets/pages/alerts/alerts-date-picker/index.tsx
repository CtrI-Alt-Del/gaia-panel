import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { AlertsDatePickerView } from './alerts-date-picker-view'

export const AlertsDatePicker = () => {
  const [searchParams] = useSearchParams()
  const [localValue, setLocalValue] = useState<string | null>(null)

  // Initialize local value from URL params
  useEffect(() => {
    const urlValue = searchParams.get('date')
    setLocalValue(urlValue)
  }, [searchParams])

  return (
    <>
      <input type='hidden' name='date' value={localValue || ''} />
      <AlertsDatePickerView
        value={localValue}
        onValueChange={setLocalValue}
        placeholder='Filtrar por data'
      />
    </>
  )
}
