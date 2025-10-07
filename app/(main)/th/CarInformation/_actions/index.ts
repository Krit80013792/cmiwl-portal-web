'use server'

import { getDataFromServer } from '@/helpers/functions/getDataFromServer'
import { getDataFromSession } from '@/helpers/functions/getDataFromSession'

interface CarInfo {
  carBrandId?: string
  carTypeKey: string
  isEvType: boolean
}

export const getCarColors = async () => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/master-data/v1/car-color`, {
    method: 'GET',
    token: token as string,
  })
}

export const getCarBrands = async ({ carTypeKey, isEvType }: CarInfo) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/master-data/v1/car-brand`, {
    method: 'POST',
    token: token as string,
    body: { carTypeKey, isEvType },
    cacheKey: `CarBrand:${carTypeKey}:${isEvType}`,
  })
}

export const getCarModels = async ({ carBrandId, carTypeKey, isEvType }: CarInfo) => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/master-data/v1/car-model`, {
    method: 'POST',
    token: token as string,
    body: { carBrandId, carTypeKey, isEvType },
    cacheKey: `CarModel:${carBrandId}:${carTypeKey}:${isEvType}`,
  })
}

export const getProvinces = async () => {
  const { token } = await getDataFromSession()
  return await getDataFromServer(`/api/master-data/v1/province`, {
    method: 'GET',
    token: token as string,
  })
}
