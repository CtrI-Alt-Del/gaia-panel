import { Link } from 'react-router'
import type { StationDto } from '@/core/dtos/telemetry/station-dto'
import { StatusPill } from '@/ui/shadcn/components/status-pill'
import { Badge } from '@/ui/shadcn/components/badge'
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/ui/shadcn/components/table"
import { getParameterIcon, getBadgeColor } from '../../utils/parameter-utils'

interface DetailsTabProps {
  station: StationDto
  timeAgo: (d: Date) => string
}


export default function DetailsTab({ station, timeAgo }: DetailsTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Detalhes da Estação</h2>
            <StatusPill active={station.isActive || false} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Field label="Nome" value={station.name} />
            <Field label="Última Leitura" value={station.lastReadAt ? timeAgo(station.lastReadAt) : '—'} />
            <Field label="UID" value={station.UID} />
            <Field label="Status" value={station.isActive ? 'Ativo' : 'Inativo'} />
            <Field label="Latitude" value={station.latitude.toFixed(6)} />
            <Field label="Longitude" value={station.longitude.toFixed(6)} />
          </div>
        </div>

        <div className="rounded-lg border border-stone-200">
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-lg font-medium">Parâmetros da Estação</h2>
            <Link to="/parameters" className="text-sm text-blue-600 hover:text-blue-800 underline">Gerenciar</Link>
          </div>

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
              {station.parameters.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-stone-500 py-10"
                  >
                    Nenhum parâmetro configurado.
                  </TableCell>
                </TableRow>
              )}

              {station.parameters.map((p) => {
                const {
                  Icon: IconComponent,
                  iconColor,
                  badgeColor,
                } = getParameterIcon(p.name);
                const color = getBadgeColor(p.unitOfMeasure);

                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                        >
                          <IconComponent className={`size-5 ${iconColor}`} />
                        </span>
                        <div className="leading-tight">
                          <div className="font-medium">{p.name}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge color={color as any} className="capitalize">
                        {p.unitOfMeasure}
                      </Badge>
                    </TableCell>

                    <TableCell className="tabular-nums">{p.factor}</TableCell>
                    <TableCell className="tabular-nums">{p.offset}</TableCell>

                    <TableCell>
                      <StatusPill active={p.isActive || false} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-medium mb-3">Mapa da Estação</h2>
        <div className="aspect-[4/3] w-full rounded-md bg-muted grid place-items-center text-sm text-muted-foreground">
          Placeholder do mapa
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5">{value}</div>
    </div>
  )
}

