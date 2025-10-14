import { useState } from 'react'

type UseAlertsDatePickerProps = {
  defaultValue?: string
  onValueChange?: (value: string | null) => void
}

export function useAlertsDatePicker({
  defaultValue,
  onValueChange,
}: UseAlertsDatePickerProps = {}) {
  const [value, setValue] = useState<string | null>(defaultValue || null)

  function handleValueChange(newValue: string | null) {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  function clearValue() {
    setValue(null)
    onValueChange?.(null)
  }

  return {
    value,
    handleValueChange,
    clearValue,
  }
}
