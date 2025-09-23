import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Gauge,
} from "lucide-react"

export function getParameterIcon(name: string) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("temperatura"))
    return {
      Icon: Thermometer,
      iconColor: "text-red-500",
      badgeColor: "bg-red-50 ring-red-200",
      iconBgColor: "bg-red-100",
    };
  if (lowerName.includes("umidade") || lowerName.includes("precipitação"))
    return {
      Icon: Droplets,
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-50 ring-blue-200",
      iconBgColor: "bg-blue-100",
    };
  if (lowerName.includes("vento"))
    return {
      Icon: Wind,
      iconColor: "text-gray-500",
      badgeColor: "bg-gray-50 ring-gray-200",
      iconBgColor: "bg-gray-100",
    };
  if (lowerName.includes("radiação") || lowerName.includes("uv"))
    return {
      Icon: Sun,
      iconColor: "text-yellow-500",
      badgeColor: "bg-yellow-50 ring-yellow-200",
      iconBgColor: "bg-yellow-100",
    };
  if (lowerName.includes("pressão"))
    return {
      Icon: Gauge,
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-50 ring-purple-200",
      iconBgColor: "bg-purple-100",
    };
  return {
    Icon: Cloud,
    iconColor: "text-gray-400",
    badgeColor: "bg-gray-50 ring-gray-200",
    iconBgColor: "bg-gray-100",
  };
}

export function getBadgeColor(unit: string) {
  const unitColors: Record<string, string> = {
    "°C": "red",
    "°F": "orange",
    "%": "blue",
    "hPa": "purple",
    "m/s": "gray",
    "km/h": "gray",
    "°": "yellow",
    "W/m²": "yellow",
    "mm": "blue",
    "índice": "green",
  };
  return unitColors[unit] || "stone";
}
