import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export type ParameterNameSearchInputProps = {
  label: string
  placeholder?: string
  className?: string
  id?: string
}

export const ParameterNameSearchInput = ({
  label,
  placeholder,
  className,
  id,
}: ParameterNameSearchInputProps) => {
  const [queryValue, setQueryValue] = useQueryParamString('name', '')

  return (
    <div className='flex flex-col'>
      <Label htmlFor={id || 'name'} className='text-xs text-stone-600'>
        {label}
      </Label>
      <Input
        id={id || 'name'}
        name='name'
        placeholder={placeholder || 'Ex.: Temperatura'}
        className={`h-9 w-56 ${className || ''}`}
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
      />
    </div>
  )
}
