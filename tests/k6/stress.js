import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // normal
    { duration: '3m', target: 200 }, // push
    { duration: '3m', target: 400 }, // heavier
    { duration: '2m', target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<800'],
  },
}

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export default function () {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(1)
}
