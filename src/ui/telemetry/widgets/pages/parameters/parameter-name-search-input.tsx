import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";

export type ParameterNameSearchInputProps = {
  label: string;
};

export const ParameterNameSearchInput = ({
  label,
}: ParameterNameSearchInputProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor="q" className="text-xs text-stone-600">
        {label}
      </Label>
      <Input
        id="q"
        name="q"
        placeholder="Ex.: Temperatura"
        className="h-9 w-56"
      />
    </div>
  );
};
