//* app/api/v1/cmi-api-logs/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { CMIApiLogsService } from '../../../../src/application/services/CMIApiLogsService'
import { CMIApiLogsRepository } from '../../../../src/infrastructure/database/mongodb/repositories/CMILogsApiRepository'
import { permissionGuard } from '@/src/shared/middleware/permission.guard'
import { authGuard } from '@/src/shared/middleware/auth.guard'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'

let _CMIApiLogsServiceInstance: CMIApiLogsService | null = null
async function CMIApiLogsServiceInstance(): Promise<CMIApiLogsService> {
  _CMIApiLogsServiceInstance ??= new CMIApiLogsService(new CMIApiLogsRepository())
  return _CMIApiLogsServiceInstance
}

/**
 * api/v1/cmi-api-logs/:GET Read resource
 */
export async function GET(poReq: NextRequest) {
  const ROUTE = 'api/v1/cmi-api-logs'
  const METHOD = 'GET'
  const ACTION = 'read'

  const isValidApiKey = await validateApiKey(poReq)
  if (!isValidApiKey) {
    return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
  }

  let user: any
  let permissions: any
  try {
    const auth = await authGuard()
    user = auth?.user
    permissions = auth?.permissions
    permissionGuard(permissions, 'users:read')
  } catch {
    return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
  }

  const reqLog = await serializeRequest(poReq, {})

  try {
    const oUrl = new URL(poReq.url)
    const sStartDate = oUrl.searchParams.get('startDate') ?? ''
    const sEndDate = oUrl.searchParams.get('endDate') ?? ''
    const sChannel = oUrl.searchParams.get('channel') ?? ''
    const sName = oUrl.searchParams.get('name') ?? ''
    const sLicensePlate = oUrl.searchParams.get('licensePlate') ?? ''
    const sOrderNo = oUrl.searchParams.get('orderNo') ?? ''
    const CMIApiLogsService = await CMIApiLogsServiceInstance()
    const resources = await CMIApiLogsService.getCMIApiLogs({
      pdStartDate: new Date(sStartDate),
      pdEndDate: new Date(sEndDate),
      psChannel: sChannel,
      psName: sName,
      psLicensePlate: sLicensePlate,
      psOrderNo: sOrderNo,
    })

    return new NextResponse(JSON.stringify({ message: 'Success', data: resources?.data }), { status: 200 })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : JSON.stringify(error)
    console.error(`Error ${METHOD} :`, errorMsg)

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
    } as any)

    return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 })
  }
}
