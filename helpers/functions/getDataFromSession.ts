import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/src/shared/utils/session'
import { getConfigs } from '@/services/server/actions/configs.action'

export type SessionData = {
  channelData: {
    channel: string | null
    channelConfig: any
    channelCode: string | null
  }
  token: string | null
  prefillData: any
  vehicleCategory: any
}

export const getDataFromSession: () => Promise<SessionData> = async () => {
  const session: any = await getIronSession(await cookies(), sessionOptions)
  const sessionData = session?.usrData?.data
  const vehicleCategory = session?.vehicleCategory
  const prefillData = sessionData?.prefill
  const channel = prefillData?.channel
  const token = sessionData?.jwt

  const configs = await getConfigs()
  const channelConfig = configs?.find((c) => c.configByChannel === channel?.channelCode)
  const channelData = {
    channel,
    channelConfig,
    channelCode: channel?.channelCode,
  }

  return { channelData, token, prefillData, vehicleCategory }
}
