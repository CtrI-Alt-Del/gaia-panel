import { Label } from '@/ui/shadcn/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'

type AlarmLevelSelectViewProps = {
  value?: string
}

export const AlarmLevelSelectView = ({ value }: AlarmLevelSelectViewProps) => {
  return (
    <div className='min-w-[150px]'>
      <Label htmlFor='level' className='text-sm font-medium text-gray-700'>
        Nível
      </Label>
      <Select name='level' defaultValue={value}>
        <SelectTrigger className='mt-1'>
          <SelectValue placeholder='Todos os níveis' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todos os níveis</SelectItem>
          <SelectItem value='critical'>Crítico</SelectItem>
          <SelectItem value='warning'>Aviso</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
