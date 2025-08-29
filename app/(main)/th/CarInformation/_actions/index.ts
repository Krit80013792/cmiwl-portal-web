'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { apiService } from '@/services/apiService'

interface Token {
  token: string
}

interface CarInfo extends Token {
  carBrandId?: string
  vehicleCategory?: {
    carTypeKey: string
    isEvType: boolean
  }
}

export const getCarColors = async ({ token }: Token) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/car-color`, {
    method: 'GET',
    token,
  })
}

export const getCarBrands = async ({ token, vehicleCategory }: CarInfo) => {
  const carTypeKey = vehicleCategory?.carTypeKey
  const isEvType = vehicleCategory?.isEvType
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/car-brand`, {
    method: 'POST',
    token,
    body: JSON.stringify({
      carTypeKey,
      isEvType,
    }),
    cacheKey: `CarBrand:${carTypeKey}:${isEvType}`,
  })
}

export const getCarModels = async ({ token, carBrandId, vehicleCategory }: CarInfo) => {
  const carTypeKey = vehicleCategory?.carTypeKey
  const isEvType = vehicleCategory?.isEvType
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/car-model`, {
    method: 'POST',
    token,
    body: JSON.stringify({
      carBrandId,
      carTypeKey,
      isEvType,
    }),
    cacheKey: `CarModel:${carBrandId}:${carTypeKey}:${isEvType}`,
  })
}
