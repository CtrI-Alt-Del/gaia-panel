import { useState } from 'react'
import type { AlarmDto } from '@/core/alerting/dtos/alarm-dto'

type UseAlarmsPageProps = {
  alarms: AlarmDto[]
}

export function useAlarmsPage({ alarms }: UseAlarmsPageProps) {
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmDto | undefined>(undefined)

  function handleEdit(id: string) {
    const alarm = alarms.find((a) => String(a.id) === id)
    if (alarm) {
      setSelectedAlarm(alarm)
    }
  }

  return {
    selectedAlarm,
    handleEdit,
  }
}