# Routing and Flows

Baseline specification for URL routing, middleware behavior, and user flow entry points.

## ADDED Requirements

### Requirement: Root path redirects to main TH flow

The root path `/` SHALL redirect to the main TH flow entry (VehicleCTP).

#### Scenario: Root redirect

- **WHEN** a request is made to `/`
- **THEN** the middleware SHALL respond with a redirect to `/th/VehicleCTP`

### Requirement: CMS protected routes require valid session

Access to CMS protected routes SHALL require a valid CMS session (decrypted cookie) and SHALL validate that the request user-agent matches the session user-agent.

#### Scenario: Protected route without matching session

- **WHEN** a request is made to a path in the protected routes list and the session user-agent does not match the request user-agent
- **THEN** the middleware SHALL redirect to `/pw0wl`

#### Scenario: CMS login when already authenticated

- **WHEN** a request is made to `/pw0wl` and the session has a matching user-agent
- **THEN** the middleware SHALL redirect to `/cms/main`

### Requirement: CMS route access is restricted by session routes

CMS and pw0wl access SHALL be restricted by the list of routes in the session. If the path is not in the allowed routes, the user SHALL be redirected appropriately.

#### Scenario: Unauthorized CMS path

- **WHEN** the path starts with `/cms` and the path is not in the session's allowed routes (and allowed routes exist)
- **THEN** the middleware SHALL redirect to `/pw0wl`

#### Scenario: Unauthorized pw0wl when routes exist

- **WHEN** the path is `/pw0wl` and the session has allowed routes but the current path is not authorized
- **THEN** the middleware SHALL redirect to `/cms/main`

### Requirement: TH client routes require JWT in session

Paths under `/th/` that are considered client routes (no file extension in the last segment) SHALL require a JWT in the iron-session. If the JWT is missing, the user SHALL be redirected to the external Tidlor app.

#### Scenario: Client route without JWT

- **WHEN** the path is a client route (e.g. `/th/VehicleCTP`) and the iron-session does not contain `usrData.data.jwt`
- **THEN** the middleware SHALL redirect to `https://app.tidlor.com/main`

#### Scenario: Client route with JWT

- **WHEN** the path is a client route and the iron-session contains a valid JWT
- **THEN** the middleware SHALL allow the request to proceed

### Requirement: Insurer guard gates TH flows

TH flows (except VIB-Error and launch) SHALL be gated by an insurer check. If all insurers in the session are inactive, the user SHALL be redirected to the VIB-Error page.

#### Scenario: All insurers inactive

- **WHEN** the path is not `/th/VIB-Error` and not under `/launch`, and every insurer in the session has `active` false
- **THEN** the middleware SHALL redirect to `/th/VIB-Error`

#### Scenario: At least one insurer active

- **WHEN** at least one insurer in the session has `active` true
- **THEN** the middleware SHALL NOT redirect to `/th/VIB-Error` for the insurer check

### Requirement: Certain paths are excluded from middleware auth

Health checks and the PaymentCC path SHALL be excluded from middleware authentication and redirect logic.

#### Scenario: Health and PaymentCC bypass

- **WHEN** the path is `/th/PaymentCC` or the path includes `health`
- **THEN** the middleware SHALL not apply CMS or client-route auth redirects for that path

### Requirement: Middleware matcher excludes static and API

The middleware SHALL run only on relevant request paths. API routes, Next.js static/data assets, favicon, robots, sitemap, and paths with file extensions SHALL be excluded by the matcher.

#### Scenario: Matcher configuration

- **WHEN** the middleware config is evaluated
- **THEN** the matcher SHALL exclude `api`, `_next/static`, `_next/image`, `_next/data`, `favicon.ico`, `robots.txt`, `sitemap.xml`, and paths containing a dot (e.g. static files)
