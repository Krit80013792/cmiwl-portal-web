// Session Type Definitions

export interface UserSessionData {
  jwt: string
  userName: string
  userGroupName?: string
  prefill?: any // TODO: Define prefill structure
  orderNo?: string
  permissions?: string[]
}

export interface Insurer {
  id: string
  name: string
  active: boolean
  code?: string
}

export interface CmsSessionCookie {
  userName?: string
  permissions?: string[]
  routes?: string[]
  uag?: string // user-agent
}

export interface Channel {
  channelCode: string
  channelName?: string
  [key: string]: any
}

export interface ChannelConfig {
  configByChannel: string
  configName: string
  configValue: string
  [key: string]: any
}

export interface SessionChannel {
  channel: Channel | null
  channelConfig: ChannelConfig | null
  channelCode: string | null
}
