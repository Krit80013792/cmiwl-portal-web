'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'

interface Token {
  token: string
}

export const getCompulsoryRates = async ({ token, carTypeKey }: Token & { carTypeKey: string }) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/compulsory-rate/${carTypeKey}`, {
    method: 'GET',
    token,
    cacheKey: `compulsoryRate:${carTypeKey}`,
  })
}
