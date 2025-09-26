import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '10s', target: 300 }, // spike up fast
    { duration: '40s', target: 300 }, // brief hold
    { duration: '10s', target: 0 }, // drop
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(99)<1000'],
  },
}

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/pw0wl'

export default function () {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(1)
}
