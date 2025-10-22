import type { MeasurementDto } from '@/core/dtos/telemetry/measurement-dto'

type UseStationMeasurementsHookProps = {
	measurements: MeasurementDto[]
}

export function useStationMeasurementsHook({ measurements }: UseStationMeasurementsHookProps) {
	return {
		measurements,
	}
}
