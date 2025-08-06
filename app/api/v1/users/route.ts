//* app/api/v1/users/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { SafeUserDTO } from '@/src/application/dtos/UserDTO';
import { UserService } from '../../../../src/application/services/UserService';
import { UserRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserRepository';
import { UserGroupRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserGroupRepository';
import { UserRoleRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserRoleRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';
import { CreateUserSchema, UpdateUserSchema } from '@/src/shared/utils/model.validator';

let _userServiceInstance: UserService | null = null;
async function UserServiceInstance(): Promise<UserService> {
    _userServiceInstance ??= new UserService(new UserRepository(), new UserGroupRepository(), new UserRoleRepository());
    return _userServiceInstance;
};

/**
 * api/v1/users/:POST Create user
 */
//* @(users:create)
export async function POST(poReq: NextRequest) {
    const ROUTE = 'api/v1/users';
    const METHOD = 'POST';
    const ACTION = 'create';

    const isValidApiKey = await validateApiKey(poReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    let user: any;
    let permissions: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
        permissions = auth?.permissions;
        permissionGuard(permissions, 'users:create');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedUser: any;
    try {
        const body = await poReq.json();
        oParsedUser = CreateUserSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userService = await UserServiceInstance();
        oParsedUser.createdBy = user?.userName;
        oParsedUser.updatedBy = user?.userName;
        const newUser = await userService.createUser(oParsedUser);
        if (newUser?.statusCode !== 201) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUser),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUser?.message }), { status: newUser?.statusCode });
        }

        const safeUser: Partial<SafeUserDTO> = newUser?.data ? (({ password, ...rest }) => rest)(newUser.data) : {};

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(safeUser),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: safeUser }), { status: 201 });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error ${METHOD} :`, errorMsg);

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

/**
 * api/v1/users/:GET Read user
 */
//* @(users:read)
export async function GET(poReq: NextRequest) {
    const ROUTE = 'api/v1/users';
    const METHOD = 'GET';
    const ACTION = 'read';

    const isValidApiKey = await validateApiKey(poReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let user: any;
    let permissions: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
        permissions = auth?.permissions;
        permissionGuard(permissions, 'users:read');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userService = await UserServiceInstance();
        const users = await userService.getUsers(user?.userId);

        const safeUsers: SafeUserDTO[] = users?.data?.map(({ password, ...rest }) => rest) ?? [];

        return new NextResponse(JSON.stringify({ message: 'Success', data: safeUsers }), { status: 200 });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error ${METHOD} :`, errorMsg);

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

/**
 * api/v1/users/:PATCH Update user
 */
//* @(users:update)
export async function PATCH(poReq: NextRequest) {
    const ROUTE = 'api/v1/users';
    const METHOD = 'PATCH';
    const ACTION = 'update';

    const isValidApiKey = await validateApiKey(poReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    let user: any;
    let permissions: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
        permissions = auth?.permissions;
        permissionGuard(permissions, 'users:update');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedUser: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUser = UpdateUserSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userService = await UserServiceInstance();
        oParsedUser.updatedBy = user?.userName;
        const newUser = await userService.updateUser(oParsedUser?.id, oParsedUser);
        if (newUser?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUser),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUser?.message }), { status: newUser?.statusCode });
        }

        const safeUser: Partial<SafeUserDTO> = newUser?.data ? (({ password, ...rest }) => rest)(newUser.data) : {};

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(safeUser),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: safeUser }), { status: 200 });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error ${METHOD} :`, errorMsg);

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

/**
 * api/v1/users/:DELETE Delete user
 */
//* @(users:delete)
export async function DELETE(poReq: NextRequest) {
    const ROUTE = 'api/v1/users';
    const METHOD = 'DELETE';
    const ACTION = 'delete';

    const isValidApiKey = await validateApiKey(poReq);
    if (!isValidApiKey) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    let user: any;
    let permissions: any;
    try {
        const auth = await authGuard();
        user = auth?.user;
        permissions = auth?.permissions;
        permissionGuard(permissions, 'users:delete');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedUser: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUser = UpdateUserSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userService = await UserServiceInstance();
        oParsedUser.updatedBy = user?.userName;
        const userDeleted = await userService.deleteUser(oParsedUser?.id);
        if (userDeleted?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(userDeleted),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: userDeleted?.message }), { status: userDeleted?.statusCode });
        }

        const safeUser: Partial<SafeUserDTO> = userDeleted?.data ? (({ password, ...rest }) => rest)(userDeleted.data) : {};

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(safeUser),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: safeUser }), { status: 200 });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
        console.error(`Error ${METHOD} :`, errorMsg);

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
