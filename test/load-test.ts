import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js'

const GAIA_PANEL_URL = 'http://dev-alb-2035488909.us-east-1.elb.amazonaws.com'

export const options = {
  stages: [
    { duration: '60s', target: 80 },    // sobe até 80 (abaixo do normal)
    { duration: '120s', target: 80 },   // segura em 80

    { duration: '60s', target: 160 },   // sobe até 160 (carga normal)
    { duration: '120s', target: 160 },  // segura em 160

    { duration: '60s', target: 240 },   // sobe até 240 (perto do limite)
    { duration: '120s', target: 240 },  // segura em 240

    { duration: '60s', target: 320 },   // sobe até 320 (pico)
    { duration: '120s', target: 320 },  // segura em 320

    { duration: '180s', target: 0 },    // re
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<1000'],
    http_req_failed: ['rate<0.01'],
  },
}

export function handleSummary(data: any) {
  return {
    "test-load-report.html": htmlReport(data),
  }
}

export default function () {
  const response = http.get(`${GAIA_PANEL_URL}/dashboard`)

  check(response, {
    'status is 200': (response) => response.status === 200,
  })

  sleep(1)
}