import { Input } from "@/ui/shadcn/components/input";

type Props = {
  label: string;
};

export const StationNameSearchInputView = ({ label }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="name" className="text-xs text-muted-foreground">
        {label}
      </label>
      <Input
        id="name"
        name="name"
        placeholder="Ex.: EST001 ou Central"
        className="h-9 w-56"
      />
    </div>
  );
};
