'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'

interface Token {
  token: string
}

export const getAdressByZipCode = async ({ token, zipCode }: Token & { zipCode: string }) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/zipcode/${zipCode}`, {
    method: 'GET',
    token,
    cacheKey: `Zipcode:${zipCode}`,
  })
}
