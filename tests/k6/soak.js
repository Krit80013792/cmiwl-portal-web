import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 40,
  duration: '4h',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<700'],
    // Consider adding custom app-level metrics via /health endpoints
  },
}

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export default function () {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(1) // keep RPS moderate across many hours
}
