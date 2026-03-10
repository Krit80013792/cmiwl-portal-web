# Architecture

Baseline specification for CMIWL Portal Web high-level architecture and structure.

## ADDED Requirements

### Requirement: Application is a Next.js full-stack app

The application SHALL be built with Next.js 14 using the App Router. The build output SHALL be standalone for containerized deployment.

#### Scenario: Standalone build

- **WHEN** the project is built with `npm run build`
- **THEN** the output SHALL be suitable for standalone deployment (e.g. Docker) as defined in `next.config.js` `output: 'standalone'`

#### Scenario: App Router usage

- **WHEN** routes are defined
- **THEN** they SHALL live under `app/` using the App Router convention (e.g. `app/(main)/th/...`, `app/(cms-portal)/cms/...`, `app/(auth)/pw0wl`)

### Requirement: Frontend is split into main, CMS, and auth sections

The frontend SHALL be organized into three logical sections: main customer flows (TH), CMS portal, and authentication entry.

#### Scenario: Main TH routes

- **WHEN** a user accesses main customer flows
- **THEN** routes SHALL live under `app/(main)/th/` (e.g. VehicleCTP, PaymentCC, PaymentQR, renewal, VIB-Error)

#### Scenario: CMS portal routes

- **WHEN** a user accesses the CMS admin portal
- **THEN** routes SHALL live under `app/(cms-portal)/cms/` (e.g. main, users, activity-logs, configs, master-data, order-report-admin, order-report-channel)

#### Scenario: Auth entry route

- **WHEN** a user accesses CMS login
- **THEN** the entry route SHALL be `app/(auth)/pw0wl`

### Requirement: Backend follows a layered architecture

The backend SHALL follow a layered structure: API Routes orchestrate Application services; Application layer uses Domain models and Infrastructure (repositories, MongoDB).

#### Scenario: API layer

- **WHEN** backend logic is invoked from the web
- **THEN** Next.js API Routes SHALL orchestrate the Application layer (services, DTOs, interfaces)

#### Scenario: Application layer

- **WHEN** business logic is implemented
- **THEN** it SHALL live in `src/application/` (services, DTOs, interfaces) and SHALL use Domain models and Infrastructure repositories

#### Scenario: Domain and Infrastructure

- **WHEN** domain models or persistence are defined
- **THEN** models SHALL live in `src/domain/` and database/repository implementations SHALL live in `src/infrastructure/`

### Requirement: Primary data store is MongoDB

The application SHALL use MongoDB Atlas as the primary database. Data access SHALL go through the infrastructure layer (connection service and repositories).

#### Scenario: Database connection

- **WHEN** server-side code performs database operations
- **THEN** it SHALL use the shared MongoDB connection (e.g. `MongoDBConnectionService`) from the infrastructure layer

### Requirement: Layout and theming are shared for TH flows

TH (main) customer pages SHALL use a shared layout and theming system that supports per-channel configuration (e.g. primary and secondary colors).

#### Scenario: Dynamic styling

- **WHEN** a TH page renders
- **THEN** it MAY use layout components (e.g. from `cmi-layout`) that accept dynamic style configuration (e.g. `MainWithDynamicStyle` with `primaryColor`, `secondaryColor`)

### Requirement: Security headers are applied globally

The application SHALL send security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) on responses as configured in `next.config.js`.

#### Scenario: Security headers present

- **WHEN** any page or API route is served
- **THEN** the response SHALL include the headers defined in `next.config.js` `async headers()`
