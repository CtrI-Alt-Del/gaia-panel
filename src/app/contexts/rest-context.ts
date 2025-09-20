import type { MembershipService } from '@/core/membership/interfaces'
import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import { createContext } from 'react-router'

type RestContext = {
  membershipService: MembershipService
  telemetryService: TelemetryService
}

export const restContext = createContext<RestContext>()
