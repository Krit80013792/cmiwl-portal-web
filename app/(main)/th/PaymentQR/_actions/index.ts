'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const getPaymentQrCode = async ({ channelOrderID }: { channelOrderID: string }) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/payment/v1/qr-code`, {
    method: 'POST',
    token: token as string,
    body: {
      channelOrderID,
      paymentType: 'FullPayment',
      payTypeCode: 'QRCS',
    },
  })
}
