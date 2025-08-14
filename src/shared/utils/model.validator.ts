import { z } from "zod";

const userNameSchema = z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Invalid Username format.",
});

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters')
    .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one number',
    })
    .refine((val) => /[!@#$*\-_?]/.test(val), {
        message: 'Password must contain at least one special character (!@#$*-_?)',
    });

export const UserSchema = z.object({
    id: z.string(),
    userId: z.string().optional(),
    userName: userNameSchema,
    password: passwordSchema,
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

export const ConfigSchema = z.object({
    id: z.string(),
    configId: z.string().optional(),
    configName: z.string().optional(),
    configKey: z.string().optional(),
    configValue: z.string().optional(),
    configDescription: z.string().optional(),
    configByChannel: z.string().optional(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateConfigSchema = ConfigSchema.omit({ id: true, createdAt: true, updatedAt: true });

export const UpdateConfigSchema = ConfigSchema.partial().extend({
    configId: z.string().min(1, "Config ID is required")
});
