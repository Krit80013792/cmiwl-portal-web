import redis from '@/src/shared/utils/redis'
import axios, { AxiosRequestConfig } from 'axios'

export interface Config extends AxiosRequestConfig {
  token: string
}

export const apiService = async (url: string, config?: Config) => {
  try {
    const response = await axios({
      method: config?.method || 'GET',
      url,
      headers: {
        Authorization: `Bearer ${config?.token}`,
        'Content-Type': 'application/json',
      },
      data: config?.data,
      ...config,
    })
    return response.data
  } catch (error: any) {
    throw error?.response?.data || error
  }
}

export const redisService = async (cacheKey: string) => {
  const cachedData = await redis.get(cacheKey)
  if (cachedData) {
    try {
      return JSON.parse(cachedData)
    } catch (error) {
      console.warn('Failed to parse cached data for', cacheKey, error)
    }
  }
}
