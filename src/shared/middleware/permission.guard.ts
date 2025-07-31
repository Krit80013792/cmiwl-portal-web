//* src/shared/middleware/permission.guard.ts

export function permissionGuard(permissions: string[], required: string | string[]) {
    const requiredPermissions = Array.isArray(required) ? required : [required];
    const hasPermission = requiredPermissions.every((perm) => permissions.includes(perm));

    if (!hasPermission) {
        throw new Error('Forbidden');
    }
};
