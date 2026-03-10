# Auth and Sessions

Baseline specification for CMS authentication, TH client session, cookies, and security-related behavior.

## ADDED Requirements

### Requirement: CMS session is stored in an encrypted cookie

The CMS session SHALL be stored in a cookie whose name is derived from the environment (e.g. `{APP_ENV}_cmiwl_cms_token`). The cookie value SHALL be encrypted and SHALL contain at least userName, permissions, routes, and user-agent (uag).

#### Scenario: Cookie name is environment-specific

- **WHEN** the middleware reads the CMS session
- **THEN** it SHALL use the cookie name `${process.env.APP_ENV}_cmiwl_cms_token`

#### Scenario: Decryption uses portal key

- **WHEN** the CMS cookie is read
- **THEN** the value SHALL be decrypted using the key from `process.env.PORTAL_API_KEY` (or equivalent) before parsing

### Requirement: CMS session sets a derived cookie for the frontend

After decrypting the CMS token, the middleware SHALL set a derived cookie (e.g. `cmiwl_cms_me`) containing a minimal payload (e.g. userName and perms) so the frontend can read user context without decrypting.

#### Scenario: Derived cookie content

- **WHEN** a valid CMS token cookie is present
- **THEN** the response SHALL set a cookie (e.g. `cmiwl_cms_me`) with a payload that includes at least userName and permissions, encoded (e.g. base64 and URL-encoded) for client consumption

### Requirement: CMS session is bound to user-agent

Access to CMS protected routes SHALL require that the request user-agent matches the user-agent stored in the session (uag). A mismatch SHALL result in redirect to login.

#### Scenario: User-agent mismatch on protected route

- **WHEN** the path is in the CMS protected routes list and the session uag does not match the request user-agent
- **THEN** the middleware SHALL redirect to `/pw0wl`

### Requirement: TH client session uses iron-session

The TH (main) client flows SHALL use iron-session for server-side session storage. A JWT SHALL be stored in the session (e.g. under `usrData.data.jwt`) and SHALL be required for client routes under `/th/`.

#### Scenario: JWT required for client routes

- **WHEN** the path is a TH client route and the iron-session does not contain a JWT at the expected path
- **THEN** the middleware SHALL redirect to the external Tidlor app URL (e.g. `https://app.tidlor.com/main`)

#### Scenario: Session options

- **WHEN** iron-session is used
- **THEN** it SHALL use the shared session options (e.g. from `src/shared/utils/session`) and Next.js cookies

### Requirement: Insurer state is stored in session

The list of insurers and their active state SHALL be available in the session (e.g. `session.insurers`). The middleware SHALL use this to decide whether to allow TH flows or redirect to VIB-Error.

#### Scenario: Insurer check uses session

- **WHEN** the insurer guard runs
- **THEN** it SHALL read insurers from the iron-session (e.g. `session.insurers`) and SHALL treat all insurers as inactive only when every item has `active` false

### Requirement: Route-level permissions are enforced from session

CMS and pw0wl route access SHALL be restricted by a list of allowed routes in the session. The middleware SHALL allow access only when the current path is in that list (or when the list is empty/not used).

#### Scenario: Allowed routes check

- **WHEN** the session has a non-empty `routes` (or equivalent) list
- **THEN** the middleware SHALL allow the request only if the path ends with one of the allowed route values; otherwise it SHALL redirect as defined in routing-and-flows
