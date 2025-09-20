import { useRef, useState } from 'react'
import type { ModalRef } from '@/ui/global/widgets/components/modal'
import type { AlarmRule } from '../../pages/alarms-old/use-alarms-page'

export interface UseAlarmsTableProps {
  onEditAlarm: (alarmId: string, data: Partial<AlarmRule>) => void
  onToggleActive?: (alarmId: string) => void
}

export function useAlarmsTable({ onEditAlarm, onToggleActive }: UseAlarmsTableProps) {
  const modalRef = useRef<ModalRef>(null)
  const editModalRef = useRef<ModalRef>(null)
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmRule | null>(null)
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [alarmToDeactivate, setAlarmToDeactivate] = useState<AlarmRule | null>(null)

  async function handleCreateAlarm() {
    modalRef.current?.open()
  }

  async function handleEditAlarm(alarm: AlarmRule) {
    setSelectedAlarm(alarm)
    editModalRef.current?.open()
  }

  async function handleSaveEdit(data: Partial<AlarmRule>) {
    if (selectedAlarm) {
      onEditAlarm(selectedAlarm.id, data)
      editModalRef.current?.close()
      setSelectedAlarm(null)
    }
  }

  async function handleDeactivateClick(alarm: AlarmRule) {
    setAlarmToDeactivate(alarm)
    setDeactivateDialogOpen(true)
  }

  async function handleConfirmDeactivate() {
    if (alarmToDeactivate && onToggleActive) {
      onToggleActive(alarmToDeactivate.id)
    }
    setDeactivateDialogOpen(false)
    setAlarmToDeactivate(null)
  }

  return {
    // Refs
    modalRef,
    editModalRef,

    // State
    selectedAlarm,
    deactivateDialogOpen,
    alarmToDeactivate,

    // Handlers
    handleCreateAlarm,
    handleEditAlarm,
    handleSaveEdit,
    handleDeactivateClick,
    handleConfirmDeactivate,
    setDeactivateDialogOpen,
  }
}
