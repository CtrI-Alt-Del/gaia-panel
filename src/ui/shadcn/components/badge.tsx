import type { PropsWithChildren } from "react";

type Color =
  | "stone" | "blue" | "sky" | "teal" | "green" | "yellow" | "orange" | "red" | "violet";
type Tone = "soft" | "solid" | "outline";

const soft: Record<Color, string> = {
  stone: "bg-stone-100 text-stone-800 ring-1 ring-stone-300",
  blue: "bg-blue-100 text-blue-800 ring-1 ring-blue-300",
  sky: "bg-sky-100 text-sky-800 ring-1 ring-sky-300",
  teal: "bg-teal-100 text-teal-800 ring-1 ring-teal-300",
  green: "bg-green-100 text-green-800 ring-1 ring-green-300",
  yellow: "bg-yellow-100 text-yellow-900 ring-1 ring-yellow-300",
  orange: "bg-orange-100 text-orange-900 ring-1 ring-orange-300",
  red: "bg-red-100 text-red-800 ring-1 ring-red-300",
  violet: "bg-violet-100 text-violet-800 ring-1 ring-violet-300",
};

const solid: Record<Color, string> = {
  stone: "bg-stone-800 text-white",
  blue: "bg-blue-700 text-white",
  sky: "bg-sky-700 text-white",
  teal: "bg-teal-700 text-white",
  green: "bg-green-700 text-white",
  yellow: "bg-yellow-600 text-white",
  orange: "bg-orange-600 text-white",
  red: "bg-red-600 text-white",
  violet: "bg-violet-700 text-white",
};

const outline: Record<Color, string> = {
  stone: "text-stone-800 ring-1 ring-stone-300",
  blue: "text-blue-800 ring-1 ring-blue-300",
  sky: "text-sky-800 ring-1 ring-sky-300",
  teal: "text-teal-800 ring-1 ring-teal-300",
  green: "text-green-800 ring-1 ring-green-300",
  yellow: "text-yellow-900 ring-1 ring-yellow-300",
  orange: "text-orange-900 ring-1 ring-orange-300",
  red: "text-red-800 ring-1 ring-red-300",
  violet: "text-violet-800 ring-1 ring-violet-300",
};

const toneMap: Record<Tone, Record<Color, string>> = { soft, solid, outline };

export function Badge({
  children,
  color = "stone",
  tone = "soft",
  className = "",
}: PropsWithChildren<{ color?: Color; tone?: Tone; className?: string }>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-medium ${toneMap[tone][color]} ${className}`}
    >
      {children}
    </span>
  );
}
