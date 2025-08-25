//* app/api/v1/master-data/sync/[slug]/route.ts
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { permissionGuard } from '@/src/shared/middleware/permission.guard'
import { authGuard } from '@/src/shared/middleware/auth.guard'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'

const masterDataRoutes = [
  'car-brands',
  'car-brands-ranking',
  'car-colors',
  'channels',
  'compulsory-groups',
  'compulsory-rates',
  'compulsory-types',
  'insurers',
]

/**
 * api/v1/master-data/sync/[slug]/:PATCH Update master
 */
//* @(master-data:update)
export async function PATCH(poReq: NextRequest) {
  const sModuleEndpoint = poReq?.url?.split('/').at(-1) ?? ''

  if (!masterDataRoutes.includes(sModuleEndpoint)) {
    return new NextResponse(JSON.stringify({ message: `Notfound` }), { status: 404 })
  }

  const ROUTE = `api/v1/master-data/sync/${sModuleEndpoint}`
  const METHOD = 'PATCH'
  const ACTION = 'update'

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
    permissionGuard(permissions, 'master-data:update')
  } catch {
    return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
  }

  const reqLog = await serializeRequest(poReq, {})

  try {
    let url: string = ''
    //TODO: Change base, endpoint to env
    switch (sModuleEndpoint) {
      case 'car-brands':
        url = `/api/background-job/v1/car-brand`
        break
      case 'car-brands-ranking':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/car-brand-ranking`
        break
      case 'car-colors':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/car-color`
        break
      case 'channels':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/channel`
        break
      case 'compulsory-groups':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/compulsory-group`
        break
      case 'compulsory-rates':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/compulsory-rate`
        break
      case 'compulsory-types':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/compulsory-type`
        break
      case 'insurers':
        url = `${process.env.TIDLOR_TECH_URI}/api/background-job/v1/insurer`
        break
      default:
        break
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res?.status !== 200) {
      return new NextResponse(JSON.stringify({ message: `Process API failed` }), { status: 500 })
    }

    return new NextResponse(JSON.stringify({ message: 'Success', data: '' }), { status: 200 })
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
