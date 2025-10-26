import { useEffect } from 'react'

import type { AlertDto } from '@/core/alerting/alerts/dtos'

const URL = 'http://localhost:3333/alerting/alerts/last'

type UseLastAlertsSocketOptions = {
  onGetLastAlerts?: (alerts: AlertDto[]) => void
}

export function useLastAlertsSocket({
  onGetLastAlerts,
}: UseLastAlertsSocketOptions = {}) {
  useEffect(() => {
    const es = new EventSource(URL)

    function handleMessage(event: MessageEvent) {
      if (!onGetLastAlerts) {
        return
      }

      try {
        const payload = JSON.parse(event.data) as unknown
        if (Array.isArray(payload)) {
          onGetLastAlerts(payload)
        }
      } catch (error) {
        console.error('Failed to parse alerts stream payload', error)
      }
    }

    es.addEventListener('message', (event) => handleMessage(event))

    return () => {
      es.removeEventListener('message', (event) => handleMessage(event))
      es.close()
    }
  }, [])
}
