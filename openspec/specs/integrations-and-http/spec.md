# Integrations and HTTP

Baseline specification for the HTTP client, external integrations, and environment configuration.

## ADDED Requirements

### Requirement: Shared HTTP client sets standard headers

The shared HTTP client used by client services SHALL set a JSON content type and SHALL support an API key (or equivalent) via a configuration object (e.g. `x-api-key` from `conf.ak`).

#### Scenario: Content-Type header

- **WHEN** a request is made through the shared HTTP client
- **THEN** the request SHALL include `Content-Type: application/json` (or equivalent) unless overridden

#### Scenario: API key header

- **WHEN** the client is configured with an API key (e.g. in the config object)
- **THEN** the request SHALL include the key in the agreed header (e.g. `x-api-key`)

### Requirement: HTTP client supports standard methods and optional body/query

The shared HTTP client SHALL support at least GET, POST, PUT, PATCH, and DELETE. For GET requests, an optional query string SHALL be appendable (e.g. after `?q=1&`). For POST/PUT/PATCH, an optional body SHALL be serialized as JSON.

#### Scenario: GET with query

- **WHEN** a GET request is made with an optional query filter parameter
- **THEN** the URL SHALL be constructed with the query string appended (e.g. `url + "?q=1&" + queryFilter`)

#### Scenario: Body serialization

- **WHEN** a request with a body (POST, PUT, PATCH) is made
- **THEN** the body SHALL be JSON-stringified and sent in the request

### Requirement: External domains are allowlisted in config

Domains used for images, API calls, or other external resources SHALL be explicitly allowlisted in the Next.js config (e.g. `remotePatterns` for images, CSP `connect-src` / `img-src` for security).

#### Scenario: Image remote patterns

- **WHEN** the application loads images from external hosts
- **THEN** those hosts SHALL be listed in `next.config.js` under `images.remotePatterns` (or equivalent)

#### Scenario: CSP connect-src

- **WHEN** the application connects to external APIs (e.g. payment, Tidlor)
- **THEN** those origins SHALL be included in the Content-Security-Policy `connect-src` directive in `next.config.js` headers

### Requirement: Environment variables are exposed for app and API URLs

The build SHALL expose required environment variables (e.g. APP_ENV, BASE_URL, CMIWL_PROCESS_API_AUTHORIZE_URL) via `next.config.js` `env` so they are available at runtime.

#### Scenario: Env in config

- **WHEN** the Next.js config is loaded
- **THEN** it SHALL pass through the required env vars (e.g. APP_ENV, BASE_URL, CMIWL_PROCESS_API_AUTHORIZE_URL) into the application environment

### Requirement: Payment and storage integrations use allowlisted URLs

Calls to payment (e.g. Omise) and storage (e.g. productfact storage) SHALL use HTTPS URLs that are allowlisted in CSP and, where applicable, in image or API configuration.

#### Scenario: Payment API

- **WHEN** the app communicates with the payment provider
- **THEN** the provider host (e.g. `api.omise.co`) SHALL be allowlisted in the relevant Next.js config (images and/or CSP)

#### Scenario: Storage host

- **WHEN** the app loads or links to assets from product storage
- **THEN** the storage host (e.g. productfact-storage-nonprod.areegator.com) SHALL be allowlisted in images and CSP as needed
