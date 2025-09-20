import { MeasurementUnitIconView } from './measurement-unit-icon-view'
import { useMeasurementUnitIcon } from './use-measurement-unit-icon'

export type Props = {
  unit: string
  className?: string
}

export const MeasurementUnitIcon = ({ unit, className = '' }: Props) => {
  const { config, iconClasses } = useMeasurementUnitIcon(unit)

  return (
    <MeasurementUnitIconView
      className={className}
      config={config}
      iconClasses={iconClasses}
    />
  )
}
