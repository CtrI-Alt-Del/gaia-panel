import { useLoaderData, useSearchParams } from 'react-router'

export const useDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleStationChange = (station: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (station && station !== 'all') {
      newParams.set('station', station)
    } else {
      newParams.delete('station')
    }                                                                     
    setSearchParams(newParams)
  }

  const handlePeriodChange = (period: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('period', period)
    setSearchParams(newParams)
  }

  const handleParameterChange = (parameter: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('parameter', parameter)
    setSearchParams(newParams)
  }

  return {
    handleStationChange,
    handlePeriodChange,
    handleParameterChange,
  }
}
