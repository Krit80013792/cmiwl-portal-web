//* app/api/v1/master-data/car-colors/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { MasterCarColorService } from '@/src/application/services/MasterCarColorService'
import { MasterCarColorRepository } from '@/src/infrastructure/database/mongodb/repositories/MasterCarColorRepository'
import { permissionGuard } from '@/src/shared/middleware/permission.guard'
import { authGuard } from '@/src/shared/middleware/auth.guard'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'

let _masterCarColorServiceInstance: MasterCarColorService | null = null
async function MasterCarColorServiceInstance(): Promise<MasterCarColorService> {
  _masterCarColorServiceInstance ??= new MasterCarColorService(new MasterCarColorRepository())
  return _masterCarColorServiceInstance
}

/**
 * api/v1/master-data/car-colors/:GET Read master car-colors
 */
//* @(master-data:read)
export async function GET(poReq: NextRequest) {
  const ROUTE = 'api/v1/master-data/car-colors'
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
    permissionGuard(permissions, 'master-data:read')
  } catch {
    return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
  }

  const reqLog = await serializeRequest(poReq, {})

  try {
    const masterCarColorService = await MasterCarColorServiceInstance()
    const masterCarColors = await masterCarColorService.getMasterCarColors()

    return new NextResponse(JSON.stringify({ message: 'Success', data: masterCarColors?.data }), { status: 200 })
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
