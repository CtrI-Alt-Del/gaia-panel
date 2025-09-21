interface PaginationSelectProps {
  value: number;
  onValueChange?: (value: string) => void;
  options?: number[];
  label?: string;
  className?: string;
  name?: string;
}

export function PaginationSelect({
  value,
  onValueChange,
  options = [5, 10, 20, 50],
  label = "Itens por página",
  className,
  name = "limit",
}: PaginationSelectProps) {
  const selectId = `pagination-select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col ${className || ""}`}>
      <label htmlFor={selectId} className="text-xs text-stone-600 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        defaultValue={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="h-9 w-20 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-gray-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
