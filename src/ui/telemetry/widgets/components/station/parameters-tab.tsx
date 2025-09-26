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
import {
  getParameterIcon,
  getBadgeColor,
} from '@/ui/telemetry/widgets/utils/parameter-utils'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'

interface ParametersTabProps {
  station: StationDto
}

export function ParametersTab({ station }: ParametersTabProps) {
  return (
    <div className='space-y-6'>
      <div className='rounded-lg border'>
        <div className='p-4 border-b'>
          <h2 className='text-lg font-medium'>Parâmetros da Estação</h2>
          <p className='text-sm text-muted-foreground'>
            {station.parameters.length} parâmetros configurados
          </p>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Fator</TableHead>
                <TableHead>Offset</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {station.parameters.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center text-muted-foreground py-8'
                  >
                    Nenhum parâmetro configurado para esta estação
                  </TableCell>
                </TableRow>
              ) : (
                station.parameters.map((parameter) => {
                  const {
                    Icon: IconComponent,
                    iconColor,
                    badgeColor,
                  } = getParameterIcon(parameter.name)
                  const color = getBadgeColor(parameter.unitOfMeasure)

                  return (
                    <TableRow key={parameter.id}>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <span
                            className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                          >
                            <IconComponent className={`size-5 ${iconColor}`} />
                          </span>
                          <div className='leading-tight'>
                            <div className='font-medium'>{parameter.name}</div>
                          </div>
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
