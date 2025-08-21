import { permissionGuard } from '../../src/shared/middleware/permission.guard';

describe("permissionGuard", () => {
    const userPerms = ["read", "write", "delete"];

    it("Should pass when all required permissions are present (single string)", () => {
        expect(() => permissionGuard(userPerms, "read")).not.toThrow();
    });

    it("Should pass when all required permissions are present (array)", () => {
        expect(() => permissionGuard(userPerms, ["read", "write"])).not.toThrow();
    });

    it("Should throw when a single required permission is missing", () => {
        expect(() => permissionGuard(userPerms, "create")).toThrow("Forbidden");
    });

    it("Should throw when any permission in array is missing", () => {
        expect(() => permissionGuard(userPerms, ["read", "update"])).toThrow("Forbidden");
    });

    it("Should pass when required array is empty", () => {
        expect(() => permissionGuard(userPerms, [])).not.toThrow();
    });

    it("Should pass when permissions array is empty but required is also empty", () => {
        expect(() => permissionGuard([], [])).not.toThrow();
    });

    it("Should throw when permissions array is empty and required is non-empty", () => {
        expect(() => permissionGuard([], "read")).toThrow("Forbidden");
    });
});
