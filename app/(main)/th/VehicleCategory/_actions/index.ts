'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getCompulsoryRates = async ({ carTypeKey }: { carTypeKey: string }) => {
  const { token } = await getDataFromSession()
  console.log(token)
  return await getDataFromServer(`/api/master-data/v1/compulsory-rate/${carTypeKey}`, {
    method: 'GET',
    token: token as string,
    cacheKey: `compulsoryRate:${carTypeKey}`,
  })
}
