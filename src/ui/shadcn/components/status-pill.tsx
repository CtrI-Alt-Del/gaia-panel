import { Badge } from "./badge";

export type StatusPillProps = {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
  className?: string;
};

export function StatusPill({
  active,
  activeText = "Ativo",
  inactiveText = "Inativo",
  className = "",
}: StatusPillProps) {
  return (
    <Badge
      color={active ? "green" : "stone"}
      tone="soft"
      className={`rounded-full gap-2 ${className}`}
    >
      <span
        className={`size-2 rounded-full ${active ? "bg-green-500" : "bg-stone-500"}`}
      />
      {active ? activeText : inactiveText}
    </Badge>
  );
}
