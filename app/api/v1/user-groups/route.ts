//* app/api/v1/user-groups/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { UserRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRepository';
import { UserGroupService } from '../../../../src/application/services/UserGroupService';
import { UserGroupRepository } from '../../../../src/infrastructure/database/mongodb/repositories/UserGroupRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';
import { CreateUserGroupSchema, UpdateUserGroupSchema } from '@/src/shared/utils/model.validator';

let _userGroupServiceInstance: UserGroupService | null = null;
async function UserGroupServiceInstance(): Promise<UserGroupService> {
    _userGroupServiceInstance ??= new UserGroupService(new UserGroupRepository(), new UserRepository);
    return _userGroupServiceInstance;
};

/**
 * api/v1/user-groups/:POST Create user group
 */
//* @(users:create)
export async function POST(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-groups';
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

    let oParsedUserGroup: any;
    try {
        const body = await poReq.json();
        oParsedUserGroup = CreateUserGroupSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userGroupService = await UserGroupServiceInstance();
        oParsedUserGroup.createdBy = user?.userName;
        oParsedUserGroup.updatedBy = user?.userName;
        const newUserGroup = await userGroupService.createUserGroup(oParsedUserGroup);
        if (newUserGroup?.statusCode !== 201) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUserGroup),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUserGroup?.message }), { status: newUserGroup?.statusCode });
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
            sResponseMsg: JSON.stringify(newUserGroup?.data),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newUserGroup?.data }), { status: 201 });

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
 * api/v1/user-groups/:GET Read user group
 */
//* @(users:read)
export async function GET(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-groups';
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
        const userGroupService = await UserGroupServiceInstance();
        const userGroups = await userGroupService.getUserGroups();

        return new NextResponse(JSON.stringify({ message: 'Success', data: userGroups?.data ?? [] }), { status: 200 });

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
 * api/v1/user-groups/:PATCH Update user group
 */
//* @(users:update)
export async function PATCH(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-groups';
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

    let oParsedUserGroup: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUserGroup = UpdateUserGroupSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userGroupService = await UserGroupServiceInstance();
        oParsedUserGroup.updatedBy = user?.userName;
        const newUserGroup = await userGroupService.updateUserGroup(oParsedUserGroup?.id, oParsedUserGroup);
        if (newUserGroup?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newUserGroup),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newUserGroup?.message }), { status: newUserGroup?.statusCode });
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
            sResponseMsg: JSON.stringify(newUserGroup),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newUserGroup?.data }), { status: 200 });

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
 * api/v1/user-groups/:DELETE Delete user group
 */
//* @(users:delete)
export async function DELETE(poReq: NextRequest) {
    const ROUTE = 'api/v1/user-groups';
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

    let oParsedUserGroup: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedUserGroup = UpdateUserGroupSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const userGroupService = await UserGroupServiceInstance();
        oParsedUserGroup.updatedBy = user?.userName;
        const userGroupDeleted = await userGroupService.deleteUserGroup(oParsedUserGroup?.id, oParsedUserGroup?.userGroupId);
        if (userGroupDeleted?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(userGroupDeleted),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: userGroupDeleted?.message }), { status: userGroupDeleted?.statusCode });
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
            sResponseMsg: JSON.stringify(userGroupDeleted),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: userGroupDeleted?.data }), { status: 200 });

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
