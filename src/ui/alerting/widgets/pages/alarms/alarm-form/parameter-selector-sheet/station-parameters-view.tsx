import { Button } from '@/ui/shadcn/components/button'
import { Loader2 } from 'lucide-react'
import type { StationDto } from '@/core/telemetry/dtos/station-dto'
import type { ParameterDto } from '@/core/telemetry/dtos/parameter-dto'

type StationParametersViewProps = {
  station: StationDto
  parameters: ParameterDto[]
  isLoading: boolean
  onParameterSelect: (parameter: ParameterDto) => void
}

export function StationParametersView({
  station: _station,
  parameters,
  isLoading,
  onParameterSelect,
}: StationParametersViewProps) {
  return (
    <div className='flex-grow overflow-auto'>
      {isLoading ? (
        <div className='flex items-center justify-center h-32'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <span className='ml-2'>Carregando parâmetros...</span>
        </div>
      ) : (
        <table className='w-full text-sm text-left'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 sticky top-0'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Nome do Parâmetro
              </th>
              <th scope='col' className='px-6 py-3'>
                Unidade
              </th>
              <th scope='col' className='px-6 py-3'>
                Fator
              </th>
              <th scope='col' className='px-6 py-3'>
                Offset
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {parameters.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-6 py-8 text-center text-gray-500'>
                  Esta estação não possui parâmetros cadastrados
                </td>
              </tr>
            ) : (
              parameters.map((parameter) => (
                <tr key={parameter.id} className='bg-white border-b hover:bg-gray-50'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {parameter.name}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {parameter.unitOfMeasure}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {parameter.factor || '-'}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {parameter.offset || '-'}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        parameter.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {parameter.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <Button
                      variant='link'
                      size='sm'
                      onClick={() => onParameterSelect(parameter)}
                      disabled={!parameter.isActive}
                    >
                      Selecionar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
