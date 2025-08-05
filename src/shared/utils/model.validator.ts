import { z } from "zod";

const userNameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Invalid Username format.",
});

export const UserSchema = z.object({
    id: z.string(),
    userId: z.string().optional(),
    userName: userNameSchema,
    password: z.string().min(14),
    userGroupId: z.string().uuid(),
    userGroupName: z.string().optional(),
    userRoleId: z.string().uuid(),
    userRoleName: z.string().optional(),
    isActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const UpdateUserSchema = UserSchema.partial().extend({
    userId: z.string().min(1, "User ID is required"),
}).omit({ password: true });

export const UserGroupSchema = z.object({
    id: z.string(),
    userGroupId: z.string().optional(),
    userGroupName: userNameSchema.trim(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateUserGroupSchema = UserGroupSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const UpdateUserGroupSchema = UserGroupSchema.partial().extend({
    userGroupId: z.string().min(1, "User Group ID is required")
});

export const ResourcesPermissionsSchema = z.object({
    resourceId: z.string().min(1, 'resourceId is required'),
    resourceName: z.string().min(1, 'resourceName is required'),
    permissions: z.object({
        create: z.boolean(),
        read: z.boolean(),
        update: z.boolean(),
        delete: z.boolean(),
    }),
});

export const UserRoleSchema = z.object({
    id: z.string(),
    userRoleId: z.string().optional(),
    userRoleName: userNameSchema.trim(),
    userRoleDescription: z.string().optional(),
    permissionsMap: z.array(ResourcesPermissionsSchema),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateUserRoleSchema = UserRoleSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const UpdateUserRoleSchema = UserRoleSchema.partial().extend({
    userRoleId: z.string().min(1, "User Role ID is required")
});
