'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getCompulsoryTypes = async ({ channelCode }: { channelCode: string }) => {
  const { token } = await getDataFromSession()

  return await getDataFromServer(`/api/master-data/v1/compulsory-type`, {
    method: 'GET',
    token: token as string,
    cacheKey: `${channelCode}:CompulsoryTypes`,
  })
}

export const getPrefillData = async () => {
  const { token, orderNo } = await getDataFromSession()
  console.log(orderNo)
  return await getDataFromServer(`/api/prefill/v1/get-data/${orderNo}`, {
    method: 'GET',
    token: token as string,
  })
}
