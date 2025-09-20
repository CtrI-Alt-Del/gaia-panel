import { useMemo } from 'react'
import type { MeasurementUnitIconConfig } from './measurement-unit-icon-types'
import { DEFAULT_MEASUREMENT_UNIT_ICON_CONFIG } from './measurement-unit-icon-view'
import { MEASUREMENT_UNIT_ICON_MAPPING } from './measurement-unit-icon-mapping'

export function useMeasurementUnitIcon(unit: string) {
  const config = useMemo((): MeasurementUnitIconConfig => {
    return MEASUREMENT_UNIT_ICON_MAPPING[unit] || DEFAULT_MEASUREMENT_UNIT_ICON_CONFIG
  }, [unit])

  const iconClasses = useMemo(() => {
    const baseClasses =
      'w-8 h-8 flex items-center justify-center rounded-md opacity-75 border'

    switch (config.color) {
      case 'orange':
        return `${baseClasses} bg-orange-200 text-orange-600 border-orange-300`
      case 'blue':
        return `${baseClasses} bg-blue-200 text-blue-600 border-blue-300`
      case 'green':
        return `${baseClasses} bg-green-200 text-green-600 border-green-300`
      case 'purple':
        return `${baseClasses} bg-purple-200 text-purple-600 border-purple-300`
      case 'red':
        return `${baseClasses} bg-red-200 text-red-600 border-red-300`
      case 'yellow':
        return `${baseClasses} bg-yellow-200 text-yellow-600 border-yellow-300`
      case 'amber':
        return `${baseClasses} bg-amber-200 text-amber-600 border-amber-300`
      case 'indigo':
        return `${baseClasses} bg-indigo-200 text-indigo-600 border-indigo-300`
      case 'teal':
        return `${baseClasses} bg-teal-200 text-teal-600 border-teal-300`
      case 'slate':
        return `${baseClasses} bg-slate-200 text-slate-600 border-slate-300`
      case 'gray':
        return `${baseClasses} bg-gray-200 text-gray-600 border-gray-300`
      default:
        return `${baseClasses} bg-gray-200 text-gray-600 border-gray-300`
    }
  }, [config.color])

  return {
    config,
    iconClasses,
  }
}
