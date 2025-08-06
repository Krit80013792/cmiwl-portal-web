import { ResourceDTO } from '@/src/application/dtos/ResourceDTO';

export function convertDate(paDate: Date) {
    try {
        const date = new Date(paDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear() + 543).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error(`Error convertDate :`, error);
        return "";
    }
};

export function formatDateToThai(date: Date): string {
    try {
        const months = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const year = date.getFullYear() + 543;
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${month} ${year}`;
    } catch (error) {
        console.error(`Error formatDateToThai :`, error);
        return "";
    }
};

export function getDay(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
};

export function getThaiMonthShort(date: Date): string {
    const thaiMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    return thaiMonths[date.getMonth()];
};

export function getThaiYear(date: Date): number {
    return date.getFullYear() + 543;
};

export function formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface ResourcesPermissions {
    resourceId: string;
    resourceName: string;
    resourceDescription: string;
    resourceLabel: string;
    resourceIcon: string;
    permissions: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    };
};

export function generateRandomPw(length: number = 8): string {
    const minLength = 8;
    const maxLength = 15;
    length = Math.max(minLength, Math.min(length, maxLength));

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specials = '!@#$*-_?';
    const allChars = upper + lower + digits + specials;

    const getRandom = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

    let password = [
        getRandom(upper),
        getRandom(lower),
        getRandom(digits),
        getRandom(specials)
    ];

    while (password.length < length) {
        password.push(getRandom(allChars));
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
};

export function mapResourcesToEmptyPermissions(resources: ResourceDTO[]): ResourcesPermissions[] {
    try {
        const recursive = (list: ResourceDTO[]): ResourcesPermissions[] => {
            return list.flatMap((res) => {
                const item: ResourcesPermissions = {
                    resourceId: res.resourceId,
                    resourceName: res.resourceName,
                    resourceDescription: res.resourceDescription,
                    resourceLabel: res.resourceLabel,
                    resourceIcon: res.resourceIcon,
                    permissions: {
                        create: false,
                        read: false,
                        update: false,
                        delete: false
                    }
                };

                const children = res.childrenItems?.length ? recursive(res.childrenItems) : [];
                return [item, ...children];
            });
        };
        return recursive(resources);
    } catch {
        return [];
    }
};

export function mapRoleToPermissions(resourceDTOs: ResourceDTO[], role: { userRolePermissions: string[] }): ResourcesPermissions[] {
    const permSet = new Set(role.userRolePermissions);
    const recursive = (resources: ResourceDTO[]): ResourcesPermissions[] => {
        return resources.flatMap((r) => {
            const resourceName = r.resourceName;
            const permissions: ResourcesPermissions['permissions'] = {
                create: permSet.has(`${resourceName}:create`),
                read: permSet.has(`${resourceName}:read`),
                update: permSet.has(`${resourceName}:update`),
                delete: permSet.has(`${resourceName}:delete`)
            };
            const currentItem: ResourcesPermissions = {
                resourceId: r.resourceId,
                resourceName: r.resourceName,
                resourceDescription: r.resourceDescription,
                resourceLabel: r.resourceLabel,
                resourceIcon: r.resourceIcon,
                permissions
            };
            const children = recursive(r.childrenItems || []);
            return [currentItem, ...children];
        });
    };
    return recursive(resourceDTOs);
};
