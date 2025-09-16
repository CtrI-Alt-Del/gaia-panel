import {
  ThermometerSun,
  Droplets,
  CloudRain,
  Wind,
  Gauge,
  Sun,
  Circle,
  AlertTriangle,
} from 'lucide-react'

const IconMap = {
  thermometer: ThermometerSun,
  droplets: Droplets,
  'cloud-rain': CloudRain,
  wind: Wind,
  gauge: Gauge,
  sun: Sun,
}

const IconColorMap = {
  thermometer: 'text-orange-500',
  droplets: 'text-sky-500',
  'cloud-rain': 'text-blue-500',
  wind: 'text-teal-500',
  gauge: 'text-violet-500',
  sun: 'text-yellow-500',
}

const IconBgColorMap = {
  thermometer: 'bg-orange-100 ring-orange-200',
  droplets: 'bg-sky-100 ring-sky-200',
  'cloud-rain': 'bg-blue-100 ring-blue-200',
  wind: 'bg-teal-100 ring-teal-200',
  gauge: 'bg-violet-100 ring-violet-200',
  sun: 'bg-yellow-100 ring-yellow-200',
}

const SeverityIconMap = {
  critical: AlertTriangle,
  alarm: Circle,
  warning: Circle,
}

const SeverityColorMap = {
  critical: 'bg-red-100 text-red-800 ring-red-200',
  alarm: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  warning: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
}

export const getIcon = (iconName: string) => {
  const IconComponent =
    IconMap[iconName as keyof typeof IconMap] || IconMap.thermometer
  return IconComponent
}

export const getIconColor = (iconName: string) => {
  return IconColorMap[iconName as keyof typeof IconColorMap] || 'text-orange-500'
}

export const getIconBgColor = (iconName: string) => {
  return (
    IconBgColorMap[iconName as keyof typeof IconBgColorMap] ||
    'bg-orange-100 ring-orange-200'
  )
}

export const getSeverityIcon = (severity: string) => {
  return (
    SeverityIconMap[severity as keyof typeof SeverityIconMap] ||
    SeverityIconMap.alarm
  )
}

export const getSeverityColor = (severity: string) => {
  return (
    SeverityColorMap[severity as keyof typeof SeverityColorMap] ||
    'bg-yellow-100 text-yellow-800 ring-yellow-200'
  )
}
