import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'
import { Label } from '@/ui/shadcn/components/label'

type Props = {
  parameters: ParameterDto[]
  defaultValue?: string
}

export const ParametersSelectView = ({ parameters, defaultValue = 'all' }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>Parâmetro</Label>
      <Select name='parameterId' defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder='Selecione um parâmetro' />
        </SelectTrigger>
        <SelectContent>
          {parameters.map((parameter) => (
            <SelectItem key={parameter.id} value={String(parameter.id)}>
              {parameter.name}
            </SelectItem>
          ))}
          <SelectItem key='all' value='all'>
            Todos
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
