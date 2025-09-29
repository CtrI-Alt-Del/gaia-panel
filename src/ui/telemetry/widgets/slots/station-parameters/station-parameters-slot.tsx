import { Badge } from '@/ui/shadcn/components/badge'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/shadcn/components/table'
import { getParameterIcon, getBadgeColor } from '../../utils/parameter-utils'
import type { ParameterDto } from '@/core/telemetry/dtos'
import { SquareArrowOutUpRight } from 'lucide-react'

type Props = {
  parameters: ParameterDto[]
}

export const StationParametersSlotView = ({ parameters }: Props) => {
  return (
    <div>
      <div className='space-y-6'>
        <div className='border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='pl-6'>Nome</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Fator</TableHead>
                <TableHead>Offset</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parameters.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center text-muted-foreground py-8'
                  >
                    Nenhum parâmetro configurado para esta estação
                  </TableCell>
                </TableRow>
              ) : (
                parameters.map((parameter) => {
                  const {
                    Icon: IconComponent,
                    iconColor,
                    badgeColor,
                  } = getParameterIcon(parameter.name)
                  const color = getBadgeColor(parameter.unitOfMeasure)

                  return (
                    <TableRow key={parameter.id}>
                      <TableCell className='pl-6'>
                        <div className='flex items-center gap-3'>
                          <span
                            className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                          >
                            <IconComponent className={`size-5 ${iconColor}`} />
                          </span>
                          <a
                            href={`/parameters?id=${parameter.id}`}
                            className='hover:underline flex flex-1 items-center gap-2'
                          >
                            <div className='leading-tight'>
                              <div className='font-medium'>{parameter.name}</div>
                            </div>
                            <SquareArrowOutUpRight size={16} />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge color={color as any} className='capitalize'>
                          {parameter.unitOfMeasure}
                        </Badge>
                      </TableCell>
                      <TableCell className='tabular-nums'>{parameter.factor}</TableCell>
                      <TableCell className='tabular-nums'>{parameter.offset}</TableCell>
                      <TableCell>
                        <StatusPill active={parameter.isActive || false} />
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
