//* app/api/v1/master-data/channels/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { SafeMasterChannelDTO } from '@/src/application/dtos/MasterChannelDTO'
import { MasterChannelService } from '../../../../../src/application/services/MasterChannelService'
import { MasterChannelRepository } from '../../../../../src/infrastructure/database/mongodb/repositories/MasterChannelRepository'
import { permissionGuard } from '@/src/shared/middleware/permission.guard'
import { authGuard } from '@/src/shared/middleware/auth.guard'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'

let _masterChannelServiceInstance: MasterChannelService | null = null
async function MasterChannelServiceInstance(): Promise<MasterChannelService> {
  _masterChannelServiceInstance ??= new MasterChannelService(new MasterChannelRepository())
  return _masterChannelServiceInstance
}

/**
 * api/v1/master-data/channels/:GET Read master channels
 */
//* @(master-data:read)
export async function GET(poReq: NextRequest) {
  const ROUTE = 'api/v1/master-data/channels'
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
    const masterChannelService = await MasterChannelServiceInstance()
    const masterChannels = await masterChannelService.getMasterChannels()

    const safeMasterChannels: SafeMasterChannelDTO[] = masterChannels?.data?.map(({ ck, ...rest }) => rest) ?? []

    return new NextResponse(JSON.stringify({ message: 'Success', data: safeMasterChannels }), { status: 200 })
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
