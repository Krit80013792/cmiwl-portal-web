import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  scenarios: {
    // Steady browsing traffic
    browse: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
      tags: { scenario: 'browse' },
    },
    // Checkout spike starting at 2m mark
    checkout_spike: {
      executor: 'ramping-vus',
      startTime: '2m',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 150 },
        { duration: '40s', target: 0 },
      ],
      tags: { scenario: 'checkout' },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{scenario:browse}': ['p(95)<600'],
    'http_req_duration{scenario:checkout}': ['p(99)<1000'],
  },
}

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export function browse() {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(1)
}

export function checkout_spike() {
  const res = http.get(`${BASE_URL}/`)
  check(res, { '200 OK': (r) => r.status === 200 })
  sleep(0.5)
}

// Map scenario names to functions
export default function () {
  // Fallback if executor calls default
  browse()
}
