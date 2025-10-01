//* src/shared/middleware/permission.guard.ts

export function permissionGuard(permissions: string[], required: string | string[]) {
  const requiredPermissions = Array.isArray(required) ? required : [required]
  const hasPermission = requiredPermissions.every((perm) => permissions.includes(perm))

  if (!hasPermission) {
    throw new Error('Unauthorized')
  }
}

export function permissionSomeGuard(permissions: string[], required: string | string[]) {
  const requiredPermissions = Array.isArray(required) ? required : [required]
  const hasPermission = requiredPermissions.some((perm) => permissions.includes(perm))

  if (!hasPermission) {
    throw new Error('Unauthorized')
  }
}
