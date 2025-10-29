//* app/api/v1/master-data/car-brands-ranking/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { MasterCarBrandRankingService } from '@/src/application/services/MasterCarBrandRankingService'
import { MasterCarBrandRankingRepository } from '@/src/infrastructure/database/mongodb/repositories/MasterCarBrandRankingRepository'
import { permissionGuard } from '@/src/shared/middleware/permission.guard'
import { authGuard } from '@/src/shared/middleware/auth.guard'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'

let _masterCarBrandRankingServiceInstance: MasterCarBrandRankingService | null = null
async function MasterCarBrandRankingServiceInstance(): Promise<MasterCarBrandRankingService> {
  _masterCarBrandRankingServiceInstance ??= new MasterCarBrandRankingService(new MasterCarBrandRankingRepository())
  return _masterCarBrandRankingServiceInstance
}

/**
 * api/v1/master-data/car-brands-ranking/:GET Read master car-brands-ranking
 */
//* @(master-data:read)
export async function GET(poReq: NextRequest) {
  const ROUTE = 'api/v1/master-data/car-brands-ranking'
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
    const masterCarBrandRankingService = await MasterCarBrandRankingServiceInstance()
    const masterCarBrandsRanking = await masterCarBrandRankingService.getMasterCarBrandsRanking()

    return new NextResponse(JSON.stringify({ message: 'Success', data: masterCarBrandsRanking?.data }), { status: 200 })
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
