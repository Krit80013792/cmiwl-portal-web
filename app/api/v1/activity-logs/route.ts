//* app/api/v1/activity-logs/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { serializeRequest } from '@/src/shared/utils/serializeRequest';
import { TxActivityLogService } from '../../../../src/application/services/TxActivityLogService';
import { TxActivityLogRepository } from '../../../../src/infrastructure/database/mongodb/repositories/TxActivityLogRepository';
import { permissionGuard } from '@/src/shared/middleware/permission.guard';
import { authGuard } from '@/src/shared/middleware/auth.guard';
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger';

let _txActivityLogServiceInstance: TxActivityLogService | null = null;
async function TxActivityLogServiceInstance(): Promise<TxActivityLogService> {
    _txActivityLogServiceInstance ??= new TxActivityLogService(new TxActivityLogRepository());
    return _txActivityLogServiceInstance;
};

/**
 * api/v1/activity-logs/:GET Read activity-logs
 */
//* @(activity-logs:read)
export async function GET(poReq: NextRequest) {
    const ROUTE = 'api/v1/activity-logs';
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
        permissionGuard(permissions, 'activity-logs:read');
    } catch {
        return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 });
    }

    const reqLog = await serializeRequest(poReq, {});

    try {

        const oUrl = new URL(poReq.url);
        const sStartDate = oUrl.searchParams.get('startDate') ?? '';
        const sEndDate = oUrl.searchParams.get('endDate') ?? '';
        const sAction = oUrl.searchParams.get('action') ?? '';

        const txActivityLogService = await TxActivityLogServiceInstance();
        const logs = await txActivityLogService.getTxActivityLogs(sStartDate, sEndDate, sAction);
        const actions = await txActivityLogService.getActions();

        return new NextResponse(JSON.stringify({ message: 'Success', data: { logs: logs?.data, actions: actions?.data } }), { status: 200 });

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
