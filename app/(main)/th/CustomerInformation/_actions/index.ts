'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getAddressByZipCode = async ({ zipCode }: { zipCode: string }) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/master-data/v1/zipcode/${zipCode}`, {
    method: 'GET',
    token: token as string,
    cacheKey: `Zipcode:${zipCode}`,
  })
}
