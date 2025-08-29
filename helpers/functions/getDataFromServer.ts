import redis from '@/src/shared/utils/redis'

export interface Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  token: string
  channelCode?: string
  cacheKey?: string
  body?: any
}

export interface BaseResponse {
  message: string
  data: any
  from: string
}

export const getDataFromServer = async (url: string, options: Options): Promise<BaseResponse> => {
  const { cacheKey, method, body } = options
  try {
    // Try to get data from Redis cache
    // const cachedData = await redis.get(cacheKey)
    // if (cachedData) {
    //   try {
    //     return JSON.parse(cachedData)
    //   } catch (error) {
    //     console.warn('Failed to parse cached data for', cacheKey, error)
    //   }
    // }

    // If not in cache, fetch from API
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${options.token}`,
        'Content-Type': 'application/json',
      },
      body,
    })
    if (!res.ok) {
      return {
        message: 'Failed to fetch data',
        data: null,
        from: 'API',
      }
    }
    const data = await res.json()

    return {
      message: 'Data fetched successfully',
      data,
      from: 'API',
    }
  } catch (error) {
    console.error('getDataFromServer error:', error)
    throw error
  }
}
