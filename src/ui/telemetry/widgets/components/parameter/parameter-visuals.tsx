import {
  ThermometerSun,
  Droplets,
  Wind,
  Gauge,
  Sun,
  CloudRain,
  Circle,
} from "lucide-react";

export type ColorName =
  | "stone" | "blue" | "sky" | "teal" | "green" | "yellow" | "orange" | "red" | "violet";

type Visual = {
  color: ColorName;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const palette: Record<ColorName, { iconBg: string; iconRing: string }> = {
  stone: { iconBg: "bg-stone-100 text-stone-800", iconRing: "ring-stone-200" },
  blue: { iconBg: "bg-blue-100 text-blue-800", iconRing: "ring-blue-200" },
  sky: { iconBg: "bg-sky-100 text-sky-800", iconRing: "ring-sky-200" },
  teal: { iconBg: "bg-teal-100 text-teal-800", iconRing: "ring-teal-200" },
  green: { iconBg: "bg-green-100 text-green-800", iconRing: "ring-green-200" },
  yellow: { iconBg: "bg-yellow-100 text-yellow-900", iconRing: "ring-yellow-200" },
  orange: { iconBg: "bg-orange-100 text-orange-900", iconRing: "ring-orange-200" },
  red: { iconBg: "bg-red-100 text-red-800", iconRing: "ring-red-200" },
  violet: { iconBg: "bg-violet-100 text-violet-800", iconRing: "ring-violet-200" },
};

export function getParameterVisuals(name: string): Visual {
  const key = name.toLowerCase();

  if (key.includes("temperatura")) return { color: "orange", Icon: ThermometerSun };
  if (key.includes("umidade")) return { color: "sky", Icon: Droplets };
  if (key.includes("vento")) return { color: "teal", Icon: Wind };
  if (key.includes("pressão") || key.includes("pressao")) return { color: "violet", Icon: Gauge };
  if (key.includes("radiação") || key.includes("radiacao")) return { color: "yellow", Icon: Sun };
  if (key.includes("chuva") || key.includes("precip")) return { color: "blue", Icon: CloudRain };

  return { color: "stone", Icon: Circle };
}

export function getParameterTexts(name: string): { description: string; category: string } {
  const k = name.toLowerCase();

  if (k.includes("temperatura")) {
    return {
      description: "Ambient temperature measurement",
      category: "Environmental monitoring",
    };
  }
  if (k.includes("umidade")) {
    return {
      description: "Relative humidity percentage",
      category: "Atmospheric conditions",
    };
  }
  if (k.includes("vento")) {
    return {
      description: "Wind speed at measurement height",
      category: "Meteorological stations",
    };
  }
  if (k.includes("pressão") || k.includes("pressao")) {
    return {
      description: "Barometric pressure measurement",
      category: "Weather monitoring",
    };
  }
  if (k.includes("radiação") || k.includes("radiacao")) {
    return {
      description: "UV and solar irradiance levels",
      category: "Solar energy monitoring",
    };
  }
  if (k.includes("chuva") || k.includes("precip")) {
    return {
      description: "Precipitation accumulation/intensity",
      category: "Hydro-meteorology",
    };
  }

  return {
    description: "Custom meteorological parameter",
    category: "Station metadata",
  };
}
