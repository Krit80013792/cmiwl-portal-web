'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'

interface Token {
  token: string
}

interface CarInfo extends Token {
  carBrandId?: string
  carTypeKey: string
  isEvType: boolean
}

export const getCompulsoryTypes = async ({ token, channelCode }: Token & { channelCode: string }) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/compulsory-type`, {
    method: 'GET',
    token,
    cacheKey: `${channelCode}:CompulsoryTypes`,
  })
}
