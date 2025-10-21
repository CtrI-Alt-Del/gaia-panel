import type { AlertingService } from '@/core/alerting/interfaces/alerting-service'
import type { AlertsService } from '@/core/alerts/interfaces/alerts-service'
import type { MembershipService } from '@/core/membership/interfaces'
import type { TelemetryService } from '@/core/telemetry/interfaces/telemetry-service'
import { createContext } from 'react-router'

type RestContext = {
  membershipService: MembershipService
  telemetryService: TelemetryService
  alertingService: AlertingService
}

export const restContext = createContext<RestContext>()
