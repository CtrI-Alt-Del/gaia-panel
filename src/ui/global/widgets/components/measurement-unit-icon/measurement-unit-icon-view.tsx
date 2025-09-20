import {
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Sun,
  Gauge,
  Eye,
  Zap,
  Mountain,
  Compass,
  AlertTriangle,
  Cloud,
} from 'lucide-react'

import { cn } from '@/ui/shadcn/utils'
import type { MeasurementUnitIconConfig } from './measurement-unit-icon-types'

export const DEFAULT_MEASUREMENT_UNIT_ICON_CONFIG: MeasurementUnitIconConfig = {
  icon: 'cloud',
  color: 'gray',
}

const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'thermometer':
      return <Thermometer className='w-4 h-4' />
    case 'droplet':
      return <Droplets className='w-4 h-4' />
    case 'cloud-rain':
      return <CloudRain className='w-4 h-4' />
    case 'wind':
      return <Wind className='w-4 h-4' />
    case 'sun':
      return <Sun className='w-4 h-4' />
    case 'gauge':
      return <Gauge className='w-4 h-4' />
    case 'eye':
      return <Eye className='w-4 h-4' />
    case 'zap':
      return <Zap className='w-4 h-4' />
    case 'mountain':
      return <Mountain className='w-4 h-4' />
    case 'compass':
      return <Compass className='w-4 h-4' />
    case 'alert-triangle':
      return <AlertTriangle className='w-4 h-4' />
    case 'cloud':
      return <Cloud className='w-4 h-4' />
    default:
      return <Thermometer className='w-4 h-4' />
  }
}

type Props = {
  className?: string
  iconClasses: string
  config: MeasurementUnitIconConfig
}

export const MeasurementUnitIconView = ({ className, config, iconClasses }: Props) => {
  return <div className={cn(iconClasses, className)}>{renderIcon(config.icon)}</div>
}
