import { useState } from 'react'

type UseAlarmLevelSelectProps = {
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function useAlarmLevelSelect({
  defaultValue,
  onValueChange,
}: UseAlarmLevelSelectProps = {}) {
  const [value, setValue] = useState<string>(defaultValue || 'all')

  function handleValueChange(newValue: string) {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return {
    value,
    handleValueChange,
  }
}
