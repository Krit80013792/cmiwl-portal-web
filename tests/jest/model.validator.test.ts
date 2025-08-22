import {
    UserSchema,
    CreateUserSchema,
    UpdateUserSchema,
    UserGroupSchema,
    CreateUserGroupSchema,
    UpdateUserGroupSchema,
    ResourcesPermissionsSchema,
    UserRoleSchema,
    CreateUserRoleSchema,
    UpdateUserRoleSchema,
    ConfigSchema,
    CreateConfigSchema,
    UpdateConfigSchema,
} from '../../src/shared/utils/model.validator';

describe("Zod Schemas Validation", () => {
    describe("UserSchema", () => {
        const validUser = {
            id: "123",
            userName: "TestUser123",
            password: "Passw0rd!",
            userGroupId: "550e8400-e29b-41d4-a716-446655440000",
            userRoleId: "550e8400-e29b-41d4-a716-446655440000",
            isActive: true,
            createdBy: "admin",
        };

        it("Should pass with valid data", () => {
            expect(() => UserSchema.parse(validUser)).not.toThrow();
        });

        it("Should fail with invalid username format", () => {
            const invalid = { ...validUser, userName: "Invalid User!" };
            expect(() => UserSchema.parse(invalid)).toThrow("Invalid Username format.");
        });

        it("Should fail if password missing special character", () => {
            const invalid = { ...validUser, password: "Password1" };
            expect(() => UserSchema.parse(invalid)).toThrow(
                "Password must contain at least one special character (!@#$*-_?)"
            );
        });
    });

    describe("CreateUserSchema", () => {
        const validCreate = {
            userName: "NewUser123",
            password: "ValidPass1!",
            userGroupId: "550e8400-e29b-41d4-a716-446655440000",
            userRoleId: "550e8400-e29b-41d4-a716-446655440000",
            isActive: true,
            createdBy: "system",
        };

        it("Should validate CreateUserSchema", () => {
            expect(() => CreateUserSchema.parse(validCreate)).not.toThrow();
        });
    });

    // describe("UpdateUserSchema", () => {
    //     it("Should require userId", () => {
    //         const invalid = {};
    //         expect(() => UpdateUserSchema.parse(invalid)).toThrow("User ID is required");
    //     });

    //     it("Should allow partial fields but not password", () => {
    //         const valid = { userId: "u1", userName: "UpdateUser" };
    //         expect(() => UpdateUserSchema.parse(valid)).not.toThrow();
    //         expect((UpdateUserSchema as any).shape).not.toHaveProperty("password");
    //     });
    // });

    describe("UserGroupSchema", () => {
        const valid = {
            id: "1",
            userGroupName: "Admins",
            createdBy: "root",
        };

        it("Should pass valid UserGroup", () => {
            expect(() => UserGroupSchema.parse(valid)).not.toThrow();
        });

        it("Should fail with invalid userGroupName", () => {
            const invalid = { ...valid, userGroupName: "Invalid Name!" };
            expect(() => UserGroupSchema.parse(invalid)).toThrow("Invalid Username format.");
        });
    });

    describe("ResourcesPermissionsSchema", () => {
        const valid = {
            resourceId: "1",
            resourceName: "Dashboard",
            permissions: { create: true, read: true, update: false, delete: false },
        };

        it("Should validate permissions schema", () => {
            expect(() => ResourcesPermissionsSchema.parse(valid)).not.toThrow();
        });

        it("Should fail if resourceName missing", () => {
            const invalid = { ...valid, resourceName: "" };
            expect(() => ResourcesPermissionsSchema.parse(invalid)).toThrow("resourceName is required");
        });
    });

    describe("UserRoleSchema", () => {
        const valid = {
            id: "1",
            userRoleName: "Manager",
            permissionsMap: [
                {
                    resourceId: "1",
                    resourceName: "Dashboard",
                    permissions: { create: true, read: true, update: true, delete: false },
                },
            ],
            createdBy: "system",
        };

        it("Should pass valid UserRole", () => {
            expect(() => UserRoleSchema.parse(valid)).not.toThrow();
        });

        it("Should fail with invalid role name", () => {
            const invalid = { ...valid, userRoleName: "Invalid Name!" };
            expect(() => UserRoleSchema.parse(invalid)).toThrow("Invalid Username format.");
        });
    });

    describe("ConfigSchema", () => {
        const valid = {
            id: "1",
            configName: "AppConfig",
            createdBy: "system",
        };

        it("Should pass valid Config", () => {
            expect(() => ConfigSchema.parse(valid)).not.toThrow();
        });

        it("Should fail when missing createdBy", () => {
            const invalid = { id: "1" };
            expect(() => ConfigSchema.parse(invalid)).toThrow();
        });
    });

    // describe("UpdateConfigSchema", () => {
    //     it("Should require configId", () => {
    //         const invalid = {};
    //         expect(() => UpdateConfigSchema.parse(invalid)).toThrow("Config ID is required");
    //     });

    //     it("Should pass with partial data and configId", () => {
    //         const valid = { configId: "c1" };
    //         expect(() => UpdateConfigSchema.parse(valid)).not.toThrow();
    //     });
    // });
});
