import { ParameterStatusButtonView } from './parameter-status-button-view'
import { useParameterStatusButton } from './use-parameter-status-button'

type ParameterStatusButtonProps = {
  parameterId: string
  isActive: boolean
}

export const ParameterStatusButton = ({
  parameterId,
  isActive,
}: ParameterStatusButtonProps) => {
  const { handleToggle } = useParameterStatusButton({ parameterId, isActive })

  return <ParameterStatusButtonView isActive={isActive} onConfirm={handleToggle} />
}
