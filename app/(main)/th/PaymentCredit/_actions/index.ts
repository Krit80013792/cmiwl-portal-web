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
