import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 100,
  duration: '10m',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
}

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export default function () {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(1)
}
