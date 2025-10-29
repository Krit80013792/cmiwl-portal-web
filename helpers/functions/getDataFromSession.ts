import { getIronSession, IronSession, IronSessionData } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/src/shared/utils/session'
import { getConfigs } from '@/services/server/actions/configs.action'
import type { Channel, ChannelConfig, Insurer } from '@/types/session'

export type SessionData = {
  channelData: {
    channel: Channel | undefined
    channelConfig: ChannelConfig | undefined
    channelCode: string | null
  }
  token: string | null
  prefill: Record<string, any> | undefined // TODO: Define prefill structure
  insurers: Insurer[]
  productCmiDetail: Record<string, any> | undefined // TODO: Define product detail structure
  orderNo: string | null
}

export const getDataFromSession: () => Promise<SessionData> = async () => {
  const session: IronSession<IronSessionData> = await getIronSession(await cookies(), sessionOptions)
  const sessionData = session?.usrData?.data
  const prefill = sessionData?.prefill
  const orderNo = sessionData?.orderNo
  const productCmiDetail = prefill?.productCmiDetail
  const channel = prefill?.channel
  const token = sessionData?.jwt
  const insurers = session?.insurers || []

  const configs = await getConfigs()
  const channelConfig = configs?.find((c) => c.configByChannel === channel?.channelCode)
  const channelData = {
    channel,
    channelConfig,
    channelCode: channel?.channelCode ?? null,
  }

  return {
    channelData,
    token: token ?? null,
    prefill,
    insurers,
    productCmiDetail,
    orderNo: orderNo ?? null,
  }
}
