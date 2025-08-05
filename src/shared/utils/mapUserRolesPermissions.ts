export async function mapUserRolesPermissions(
    poUserRole: {
        permissionsMap?: {
            resourceId: string;
            permissions?: {
                create?: boolean;
                read?: boolean;
                update?: boolean;
                delete?: boolean;
            };
        }[];
    },
    resourceRepository: {
        findById: (id: string) => Promise<{ sResourceName: string } | null>;
    }
): Promise<{ arUserRolePermissions: string[]; arResources: string[] }> {
    const arUserRolePermissions: string[] = [];
    const arResources: string[] = [];

    for (const { resourceId, permissions } of poUserRole?.permissionsMap ?? []) {
        const resource = await resourceRepository.findById(resourceId);
        if (!resource) continue;

        arResources.push(resource.sResourceName);
        const { create, read, update, delete: del } = permissions ?? {};

        if (create) arUserRolePermissions.push(`${resource.sResourceName}:create`);
        if (read) arUserRolePermissions.push(`${resource.sResourceName}:read`);
        if (update) arUserRolePermissions.push(`${resource.sResourceName}:update`);
        if (del) arUserRolePermissions.push(`${resource.sResourceName}:delete`);
    }

    return { arUserRolePermissions, arResources };
};
