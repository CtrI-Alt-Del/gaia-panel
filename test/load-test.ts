import http from 'k6/http'
import { sleep } from 'k6'

const GAIA_PANEL_URL = 'http://dev-alb-2035488909.us-east-1.elb.amazonaws.com'

export const options = {
  stages: [
    { duration: '30s', target: 10 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.01'], // 1% of requests failing
  },
}

export default function () {
  http.get(`${GAIA_PANEL_URL}/dashboard`)

  sleep(1)
}