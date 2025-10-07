'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getPaymentType = async () => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/payment/v1/payment-type`, {
    method: 'GET',
    token: token as string,
  })
}
