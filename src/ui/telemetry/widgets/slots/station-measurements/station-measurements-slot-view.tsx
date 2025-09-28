import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'

export const StationMeasurementsSlotView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados das Medições</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-center py-8 text-muted-foreground'>
          <p>Funcionalidade de medições em desenvolvimento</p>
          <p className='text-sm mt-2'>Em breve: vários dados coletados das estações</p>
        </div>
      </CardContent>
    </Card>
  )
}
