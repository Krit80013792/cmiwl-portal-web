'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getPaymentCreditCard = async (body: {
  channelOrderID: string
  cardNumber: string
  cardName: string
  cardExpire: string
  cvv: string
}) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/payment/v1/credit-card`, {
    method: 'POST',
    token: token as string,
    body: {
      ...body,
      paymentType: 'FullPayment',
      payTypeCode: 'CCOL',
    },
  })
}

export const getPaymentStatus = async ({ paymentNo }: { paymentNo: string }) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/payment/v1/status/${paymentNo}`, {
    method: 'GET',
    token: token as string,
  })
}
