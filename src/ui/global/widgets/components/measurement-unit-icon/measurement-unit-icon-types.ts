export type MeasurementUnitIconType =
  | 'thermometer'
  | 'droplet'
  | 'cloud-rain'
  | 'wind'
  | 'sun'
  | 'gauge'
  | 'eye'
  | 'zap'
  | 'mountain'
  | 'compass'
  | 'alert-triangle'
  | 'cloud'

export type MeasurementUnitIconColor =
  | 'orange'
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'amber'
  | 'indigo'
  | 'teal'
  | 'slate'
  | 'gray'

export type MeasurementUnitIconConfig = {
  icon: MeasurementUnitIconType
  color: MeasurementUnitIconColor
}
