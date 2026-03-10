# Backend Services

Baseline specification for the application service layer, conventions, and domain/infrastructure usage.

## ADDED Requirements

### Requirement: Application services live in src/application/services

Server-side business logic SHALL be implemented in the Application layer. Each service SHALL live under `src/application/services/` and SHALL be named consistently (e.g. UserService, ConfigService).

#### Scenario: Service location

- **WHEN** a new server-side service is added for domain operations
- **THEN** it SHALL be placed in `src/application/services/` with a descriptive name ending in `Service`

#### Scenario: Service dependencies

- **WHEN** a service performs persistence or domain operations
- **THEN** it SHALL depend on repository interfaces (e.g. from `src/application/interfaces/`) and SHALL use the infrastructure MongoDB connection (e.g. `MongoDBConnectionService`) before database operations

### Requirement: Services return a standard response shape

Application services that return data or operation results SHALL return a consistent response shape (e.g. BaseResponse with statusCode, message, data).

#### Scenario: Success response

- **WHEN** a service method completes successfully
- **THEN** it SHALL return an object that includes at least a status code, a message, and a data field (or null)

#### Scenario: Error response

- **WHEN** a service method encounters an error or validation failure
- **THEN** it SHALL return the same response shape with an appropriate status code and message, and null or empty data where applicable

### Requirement: Services map between DTOs and domain models

Services that handle persisted entities SHALL map between Data Transfer Objects (DTOs) used at API boundaries and domain models (e.g. Mongoose documents) used with repositories.

#### Scenario: DTO to domain mapping

- **WHEN** a service accepts input for create or update
- **THEN** it SHALL convert from DTO (or partial DTO) to domain model before calling the repository

#### Scenario: Domain to DTO mapping

- **WHEN** a service returns entity data to the caller
- **THEN** it SHALL convert from domain model to DTO in the response data

### Requirement: Passwords are hashed before storage

Any service that creates or updates user passwords SHALL hash the password (e.g. with bcrypt) before persisting. Plain-text passwords SHALL NOT be stored.

#### Scenario: Create user with password

- **WHEN** a user is created with a password
- **THEN** the service SHALL hash the password (e.g. bcrypt with a defined cost) before saving to the repository

#### Scenario: Password verification

- **WHEN** a user is verified (e.g. login)
- **THEN** the service SHALL compare the provided password with the stored hash using a constant-time comparison (e.g. bcrypt.compare)

### Requirement: Client-side API calls use services under services/client

Browser-side code that calls external or backend APIs SHALL use client services (e.g. under `services/client/`) that wrap a shared HTTP client, rather than ad-hoc fetch calls.

#### Scenario: Client service usage

- **WHEN** the frontend needs to call an API
- **THEN** it SHALL use a dedicated client service module (e.g. `auth.service.ts`, `users.service.ts`, `httpClient.service.ts`) where applicable

#### Scenario: HTTP client centralization

- **WHEN** client services make HTTP requests
- **THEN** they SHALL use the shared HTTP client (e.g. `httpClient` from `services/client/httpClient.service.ts`) for consistent headers and behavior
