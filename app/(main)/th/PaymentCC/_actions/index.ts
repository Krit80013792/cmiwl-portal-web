'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getPaymentStatus = async ({ paymentNo }: { paymentNo: string }) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/payment/v1/status/${paymentNo}`, {
    method: 'GET',
    token: token as string,
  })
}
