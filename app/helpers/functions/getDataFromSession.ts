import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/src/shared/utils/session'
import { getConfigs } from '@/services/server/actions/configs.action'

export type SessionData = {
  channelData: {
    channel: string | null
    channelConfig: any
  }
}

export const getDataFromSession: () => Promise<SessionData> = async () => {
  const session = await getIronSession(await cookies(), sessionOptions)
  const sessionData = (session as any)?.usrData?.data

  const channel = sessionData?.prefill?.channel

  const configs = await getConfigs()
  const channelConfig = configs?.find((c) => c.configByChannel === channel?.channelCode)

  const channelData = {
    channel,
    channelConfig,
  }

  return { channelData }
}
