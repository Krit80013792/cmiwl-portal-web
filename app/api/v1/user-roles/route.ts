//* app/api/v1/user-roles/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { UserRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRepository';
import { UserRoleService } from '../../../../src/application/services/UserRoleService';
import { UserRoleRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserRoleRepository';
import { ResourceRepository } from '@/src/infrastructure/database/mongodb/repositories/ResourceRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';
import { CreateUserRoleSchema, UpdateUserRoleSchema } from '@/src/shared/utils/model.validator';

let _userRoleServiceInstance: UserRoleService | null = null;
async function UserRoleServiceInstance(): Promise<UserRoleService> {
    _userRoleServiceInstance ??= new UserRoleService(new UserRoleRepository(), new UserRepository(), new ResourceRepository());
    return _userRoleServiceInstance;
};

/**
 * api/v1/user-roles/:POST Create user role
 */
//* @(users:create)
export async function POST(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-roles';
    const METHOD = 'POST';
    const ACTION = 'create';

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
        permissionGuard(permissions, 'users:create');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedUserRole: any;
    try {
        const body = await poReq.json();
        oParsedUserRole = CreateUserRoleSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userRoleService = await UserRoleServiceInstance();
        oParsedUserRole.createdBy = user?.userName;
        oParsedUserRole.updatedBy = user?.userName;
        const newUserRole = await userRoleService.createUserRole(oParsedUserRole);
        if (newUserRole?.statusCode !== 201) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUserRole),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUserRole?.message }), { status: newUserRole?.statusCode });
        }

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(newUserRole?.data),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newUserRole?.data }), { status: 201 });

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
 * api/v1/user-roles/:GET Read user role
 */
//* @(users:read)
export async function GET(oReq: NextRequest) {
    const ROUTE = 'api/v1/user-roles';
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
        permissionGuard(permissions, 'users:read');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(oReq, {});

    try {
        const userRoleService = await UserRoleServiceInstance();
        const userRoles = await userRoleService.getUserRoles();

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(userRoles?.message),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: userRoles?.data ?? [] }), { status: 200 });

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
 * api/v1/user-roles/:PATCH Update user role
 */
//* @(users:update)
export async function PATCH(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-roles';
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

    let oParsedUserRole: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUserRole = UpdateUserRoleSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userRoleService = await UserRoleServiceInstance();
        oParsedUserRole.updatedBy = user?.userName;
        const newUserRole = await userRoleService.updateUserRole(oParsedUserRole?.id, oParsedUserRole);
        if (newUserRole?.statusCode !== 201) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUserRole),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUserRole?.message }), { status: newUserRole?.statusCode });
        }

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(newUserRole),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newUserRole?.data }), { status: 200 });

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
 * api/v1/user-roles/:DELETE Delete user role
 */
//* @(users:delete)
export async function DELETE(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-roles';
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

    let oParsedUserRole: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUserRole = UpdateUserRoleSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userRoleService = await UserRoleServiceInstance();
        oParsedUserRole.updatedBy = user?.userName;
        const userRoleDeleted = await userRoleService.deleteUserRole(oParsedUserRole?.id, oParsedUserRole?.userRoleId);
        if (userRoleDeleted?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(userRoleDeleted),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: userRoleDeleted?.message }), { status: userRoleDeleted?.statusCode });
        }

        await TxActivityLogger.log({
            sUserName: user?.userName,
            sUserGroupName: user?.userGroupName,
            sUserRoleName: user?.userRoleName,
            sRoute: ROUTE,
            sMethod: METHOD,
            sAction: ACTION,
            sStatus: 'success',
            sRequestMsg: JSON.stringify(reqLog),
            sResponseMsg: JSON.stringify(userRoleDeleted),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: userRoleDeleted?.data }), { status: 200 });

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
