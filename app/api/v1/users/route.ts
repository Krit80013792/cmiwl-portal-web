//* app/api/v1/users/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { SafeUserDTO } from '@/src/application/dtos/UserDTO';
import { UserService } from '../../../../src/application/services/UserService';
import { UserRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';

let _userServiceInstance: UserService | null = null;
async function UserServiceInstance(): Promise<UserService> {
    _userServiceInstance ??= new UserService(new UserRepository());
    return _userServiceInstance;
};

/**
 * api/v1/users/:POST Create user
 */
//* @(users:create)
export async function POST(oReq: NextRequest) {
    try {
        const isValidApiKey = await validateApiKey(oReq);
        if (!isValidApiKey) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const { user, permissions } = await authGuard();

        permissionGuard(permissions, 'users:create');


    } catch (error) {
        console.error(`Error POST :`, error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};

/**
 * api/v1/users/:GET Read user
 */
//* @(users:read)
export async function GET(oReq: NextRequest) {
    const ROUTE = 'api/v1/users';
    const METHOD = 'GET';
    const ACTION = 'read';

    const isValidApiKey = await validateApiKey(oReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let user: any;
    let permissions: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
        permissions = auth?.permissions;
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(oReq, {});

    try {
        permissionGuard(permissions, 'users:read');

        const userService = await UserServiceInstance();
        const users = await userService.getUsers();

        const safeUsers: SafeUserDTO[] = users?.data?.map(({ password, ...rest }) => rest) ?? [];

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(safeUsers),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: safeUsers }), { status: 200 });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error GET :`, errorMsg);

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'failed',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: errorMsg,
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 });
    }
};
