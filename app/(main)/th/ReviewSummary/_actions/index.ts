'use server'

import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

export const saveCustomerInformation = async ({ body }: { body: any }) => {
  try {
    const { token } = await getDataFromSession()
    const res = await fetch(`${process.env.TIDLOR_TECH_URI}/api/selling/v1/save`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      const data = await res.json()
      return {
        message: 'Data saved successfully',
        data,
        from: 'API',
      }
    } else {
      console.error('Error saving data:', res.statusText)
      return {
        message: 'Error saving data',
        data: null,
        from: 'API',
      }
    }
  } catch (error) {
    console.error('Error saving data:', error)
    return {
      message: 'Error saving data',
      data: null,
      from: 'Catch',
    }
  }
}
