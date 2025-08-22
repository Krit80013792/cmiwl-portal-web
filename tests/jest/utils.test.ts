import {
    convertDate,
    formatDateToThai,
    getDay,
    getThaiMonthShort,
    getThaiYear,
    formatDateToYMD,
    generateRandomPw,
    mapResourcesToEmptyPermissions,
    mapRoleToPermissions,
    isValidJpegBase64,
} from '../../src/shared/utils/utils';

import { ResourceDTO } from '@/src/application/dtos/ResourceDTO';

describe("Date Utils", () => {
    it("ConvertDate should format correctly", () => {
        const date = new Date("2023-01-01T08:30:00");
        expect(convertDate(date)).toBe("01/01/66 08:30"); // 2023+543=2566 => 66 (last 2 digits)
    });

    it("FormatDateToThai should format correctly", () => {
        const date = new Date("2025-01-01T08:30:00");
        expect(formatDateToThai(date)).toBe("01 มกราคม 2568");
    });

    it("GetDay should return 2-digit day", () => {
        expect(getDay(new Date("2023-07-03"))).toBe("03");
    });

    it("GetThaiMonthShort should return correct short month", () => {
        expect(getThaiMonthShort(new Date("2023-07-03"))).toBe("ก.ค.");
    });

    it("GetThaiYear should return BE year", () => {
        expect(getThaiYear(new Date("2023-07-03"))).toBe(2566);
    });

    it("FormatDateToYMD should return YYYY-MM-DD", () => {
        expect(formatDateToYMD(new Date("2023-07-03"))).toBe("2023-07-03");
    });
});

describe("Password Utils", () => {
    it("GenerateRandomPw should respect min length (8)", () => {
        const pw = generateRandomPw(5);
        expect(pw.length).toBeGreaterThanOrEqual(8);
    });

    it("GenerateRandomPw should respect max length (15)", () => {
        const pw = generateRandomPw(50);
        expect(pw.length).toBeLessThanOrEqual(15);
    });

    it("GenerateRandomPw should contain upper, lower, digit, special", () => {
        const pw = generateRandomPw(12);
        expect(/[A-Z]/.test(pw)).toBeTruthy();
        expect(/[a-z]/.test(pw)).toBeTruthy();
        expect(/[0-9]/.test(pw)).toBeTruthy();
        expect(/[!@#$*\-_?]/.test(pw)).toBeTruthy();
    });
});

describe("Resource Utils", () => {
    const mockResources: ResourceDTO[] = [
        {
            id: "1",
            resourceId: "1",
            resourceOrder: 0,
            resourceName: "dashboard",
            resourcePolicy: "",
            resourceDescription: "Main dashboard",
            resourceLabel: "Dashboard",
            resourceIcon: "home",
            resourcePathTo: "",
            childrenItems: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: "tester",
            updatedBy: "tester",
        } as ResourceDTO
    ];

    it("MapResourcesToEmptyPermissions should map correctly", () => {
        const mapped = mapResourcesToEmptyPermissions(mockResources);
        expect(mapped).toHaveLength(1);
        expect(mapped[0].permissions.create).toBe(false);
    });

    it("MapResourcesToEmptyPermissions should return [] on error", () => {
        expect(mapResourcesToEmptyPermissions(null as any)).toEqual([]);
    });

    it("MapRoleToPermissions should map role permissions", () => {
        const role = { userRolePermissions: ["dashboard:read", "settings:create"] };
        const mapped = mapRoleToPermissions(mockResources, role);

        const dashboard = mapped.find((m) => m.resourceName === "dashboard");

        expect(dashboard?.permissions.read).toBe(true);
    });
});

describe("Image Utils", () => {
    it("IsValidJpegBase64 should return false for invalid data", () => {
        expect(isValidJpegBase64("data:image/jpeg;base64,abcd")).toBe(false);
    });

    it("IsValidJpegBase64 should return false for non-base64 string", () => {
        expect(isValidJpegBase64("not-a-base64")).toBe(false);
    });
});
