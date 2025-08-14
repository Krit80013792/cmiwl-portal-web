//* app/api/v1/configs/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { ConfigService } from '../../../../src/application/services/ConfigService';
import { ConfigRepository } from '../../../../src/infrastructure/database/mongodb/repositories/ConfigRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';
import { CreateConfigSchema, UpdateConfigSchema } from '@/src/shared/utils/model.validator';

let _configServiceInstance: ConfigService | null = null;
async function ConfigServiceInstance(): Promise<ConfigService> {
    _configServiceInstance ??= new ConfigService(new ConfigRepository());
    return _configServiceInstance;
};

/**
 * api/v1/configs/:POST Create config
 */
//* @(configs:create)
export async function POST(poReq: NextRequest) {
    const ROUTE = 'api/v1/configs';
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
        permissionGuard(permissions, 'configs:create');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedConfig: any;
    try {
        const body = await poReq.json();
        oParsedConfig = CreateConfigSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const configService = await ConfigServiceInstance();
        oParsedConfig.createdBy = user?.userName;
        oParsedConfig.updatedBy = user?.userName;
        const newConfig = await configService.createConfig(oParsedConfig);
        if (newConfig?.statusCode !== 201) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newConfig),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newConfig?.message }), { status: newConfig?.statusCode });
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
            sResponseMsg: JSON.stringify(newConfig?.data),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newConfig?.data }), { status: 201 });

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
 * api/v1/configs/:GET Read configs
 */
//* @(configs:read)
export async function GET(poReq: NextRequest) {
    const ROUTE = 'api/v1/configs';
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
        permissionGuard(permissions, 'configs:read');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {

        const oUrl = new URL(poReq.url);
        const sChannelCode = oUrl.searchParams.get('channel') ?? '';

        const configService = await ConfigServiceInstance();
        const configs = await configService.getConfigByChannelCode(sChannelCode);

        return new NextResponse(JSON.stringify({ message: 'Success', data: configs }), { status: 200 });

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
 * api/v1/configs/:PATCH Update config
 */
//* @(configs:update)
export async function PATCH(poReq: NextRequest) {
    const ROUTE = 'api/v1/configs';
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
        permissionGuard(permissions, 'configs:update');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    let oParsedConfig: any;
    try {
        const body = await poReq.json();
        body.createdAt = new Date(body.createdAt);
        body.updatedAt = new Date(body.updatedAt);
        oParsedConfig = UpdateConfigSchema.parse(body);
    } catch {
        return new NextResponse(JSON.stringify({ message: `Bad request` }), { status: 400 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {
        const configService = await ConfigServiceInstance();
        oParsedConfig.updatedBy = user?.userName;
        const newConfig = await configService.updateConfig(oParsedConfig?.id, oParsedConfig);
        if (newConfig?.statusCode !== 200) {
            await TxActivityLogger.log({
                sUserName: user?.userName,
                sUserGroupName: user?.userGroupName,
                sUserRoleName: user?.userRoleName,
                sRoute: ROUTE,
                sMethod: METHOD,
                sAction: ACTION,
                sStatus: 'failed',
                sRequestMsg: JSON.stringify(reqLog),
                sResponseMsg: JSON.stringify(newConfig),
                sChannel: 'CMS',
            } as any);
            return new NextResponse(JSON.stringify({ message: newConfig?.message }), { status: newConfig?.statusCode });
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
            sResponseMsg: JSON.stringify(newConfig),
            sChannel: 'CMS',
        } as any);

        return new NextResponse(JSON.stringify({ message: 'Success', data: newConfig?.data }), { status: 200 });

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
