'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getCompulsoryTypes = async ({ channelCode }: { channelCode: string }) => {
  const { token } = await getDataFromSession()

  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/compulsory-type`, {
    method: 'GET',
    token: token as string,
    cacheKey: `${channelCode}:CompulsoryTypes`,
  })
}
