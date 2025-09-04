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

export const getCarColors = async ({ token }: Token) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/car-color`, {
    method: 'GET',
    token,
  })
}

export const getCarBrands = async ({ token, carTypeKey, isEvType }: CarInfo) => {
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

export const getCarModels = async ({ token, carBrandId, carTypeKey, isEvType }: CarInfo) => {
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

export const getProvinces = async ({ token }: Token) => {
  return await getDataFromServer(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/province`, {
    method: 'GET',
    token,
  })
}
