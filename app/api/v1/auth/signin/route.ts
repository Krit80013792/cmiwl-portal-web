//* app/api/v1/auth/signin/route.ts
import { rsaDecrypt } from '@/src/shared/utils/crypto'
import { validateApiKey } from '@/src/shared/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { serializeRequest } from '@/src/shared/utils/serializeRequest'
import { SafeUserDTO } from '@/src/application/dtos/UserDTO'
import { UserService } from '@/src/application/services/UserService'
import { UserRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRepository'
import { UserRoleService } from '@/src/application/services/UserRoleService'
import { UserRoleRepository } from '@/src/infrastructure/database/mongodb/repositories/UserRoleRepository'
import { UserGroupRepository } from '@/src/infrastructure/database/mongodb/repositories/UserGroupRepository'
import { ResourceService } from '@/src/application/services/ResourceService'
import { ResourceRepository } from '@/src/infrastructure/database/mongodb/repositories/ResourceRepository'
import { TxActivityLogger } from '@/src/shared/middleware/logging/TxActivityLogger'
import { encrypt } from '@/src/shared/utils/auth.crypto'
import { mapResourcesToMenu } from '@/src/shared/utils/mapResourcesToMenu'

let _userServiceInstance: UserService | null = null
async function UserServiceInstance(): Promise<UserService> {
  _userServiceInstance ??= new UserService(new UserRepository(), new UserGroupRepository(), new UserRoleRepository())
  return _userServiceInstance
}

let _userRoleServiceInstance: UserRoleService | null = null
async function UserRoleServiceInstance(): Promise<UserRoleService> {
  _userRoleServiceInstance ??= new UserRoleService(
    new UserRoleRepository(),
    new UserRepository(),
    new ResourceRepository(),
  )
  return _userRoleServiceInstance
}

let _resourceServiceInstance: ResourceService | null = null
async function ResourceServiceInstance(): Promise<ResourceService> {
  _resourceServiceInstance ??= new ResourceService(new ResourceRepository())
  return _resourceServiceInstance
}

/**
 * api/v1/auth/signin
 */
export async function POST(oReq: NextRequest) {
  const ROUTE = 'api/v1/auth/signin'
  const METHOD = 'POST'
  const ACTION = 'signin'

  const isValidApiKey = await validateApiKey(oReq)
  if (!isValidApiKey) {
    return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
  }

  let body: any
  try {
    body = await oReq.json()
  } catch {
    return new NextResponse(JSON.stringify({ message: `Invalid request data` }), { status: 400 })
  }

  const deCryptedBodyData = await rsaDecrypt(body?.data)
  if (!deCryptedBodyData.usr || !deCryptedBodyData.pw) {
    return new NextResponse(JSON.stringify({ message: `Invalid request data` }), { status: 400 })
  }

  const reqLog = await serializeRequest(oReq, { ...body })

  try {
    //* Verify user credentials
    const userService = await UserServiceInstance()
    const user = await userService.verification(deCryptedBodyData?.usr, deCryptedBodyData?.pw)
    //* Verify user role and resources
    const userRoleId = user?.data?.userRoleId ?? ''
    const userRoleService = await UserRoleServiceInstance()
    const userRole = await userRoleService.getUserRoleById(userRoleId)

    if (!user.data || !userRole.data) {
      await TxActivityLogger.log({
        sUserName: deCryptedBodyData?.usr,
        sUserGroupName: '',
        sUserRoleName: '',
        sRoute: ROUTE,
        sMethod: METHOD,
        sAction: ACTION,
        sStatus: 'failed',
        sRequestMsg: JSON.stringify(reqLog),
        sResponseMsg: JSON.stringify(user),
        sChannel: 'CMS',
      } as any)

      return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
    }

    //* Get user resources for create menus
    const resourceService = await ResourceServiceInstance()
    const resources = await resourceService.getMultipleByResourceNames(userRole?.data?.resources)
    const menus = mapResourcesToMenu(resources?.data || [])

    const publicUserData = {
      userName: user?.data?.userName,
      userGroupName: user?.data?.userGroupName,
      perms: userRole?.data?.userRolePermissions,
    }
    const encryptedPublicData = await encrypt(JSON.stringify(publicUserData), process.env.PORTAL_API_KEY ?? '')
    const base64PublicUserData = Buffer.from(encryptedPublicData, 'binary').toString('base64')

    const privateUserData = {
      token: '',
      userId: user?.data?.userId,
      userName: user?.data?.userName,
      userGroupName: user?.data?.userGroupName,
      userRoleName: user?.data?.userRoleName,
      permissions: userRole?.data?.userRolePermissions,
      routes: userRole?.data?.resources,
      resources: menus,
      uag: oReq.headers.get('user-agent'),
    }

    const encryptedToken = await encrypt(JSON.stringify(privateUserData), process.env.PORTAL_API_KEY ?? '')

    const response = new NextResponse(JSON.stringify({ message: `Success` }), { status: 200 })
    //* Set public cookie
    response.cookies.set(`cmiwl_cms_me`, base64PublicUserData, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: 2 * 60 * 60,
      path: '/',
    })
    //* Set private cookie
    response.cookies.set(`${process.env.APP_ENV}_cmiwl_cms_token`, encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60,
      path: '/',
    })

    const safeUser: SafeUserDTO = (({ password, ...rest }) => rest)(user?.data)

    await TxActivityLogger.log({
      sUserName: deCryptedBodyData?.usr,
      sUserGroupName: user?.data?.userGroupName,
      sUserRoleName: user?.data?.userRoleName,
      sRoute: ROUTE,
      sMethod: METHOD,
      sAction: ACTION,
      sStatus: 'success',
      sRequestMsg: JSON.stringify(reqLog),
      sResponseMsg: JSON.stringify(safeUser),
      sChannel: 'CMS',
    } as any)
    return new NextResponse(JSON.stringify({ message: 'Success', data: publicUserData }), {
      status: 200,
      headers: response.headers,
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : JSON.stringify(error)
    console.error(`Error ${METHOD} :`, errorMsg)

    await TxActivityLogger.log({
      sUserName: deCryptedBodyData?.usr,
      sUserGroupName: '',
      sUserRoleName: '',
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
