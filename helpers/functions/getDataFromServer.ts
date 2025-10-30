import redis from '@/src/shared/utils/redis'

export interface Options {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  token: string
  channelCode?: string
  cacheKey?: string
  body?: any
}

export interface BaseResponse<T = any> {
  message: string
  data: T
  from: string
}

export const getDataFromServer = async <T = any>(url: string, options: Options): Promise<BaseResponse<T>> => {
  const { cacheKey, method, body } = options
  try {
    // Try to get data from Redis cache if cacheKey is provided
    if (cacheKey) {
      const cachedData = await redis.get(cacheKey)
      if (cachedData) {
        return JSON.parse(cachedData)
      }
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${options.token}`,
        'Content-Type': 'application/json',
      },
    }

    // Only attach body for non-GET requests
    if (method !== 'GET' && body !== undefined) {
      fetchOptions.body = JSON.stringify(body)
    }

    const res = await fetch(`${process.env.TIDLOR_TECH_URI}${url}`, fetchOptions)
    if (!res.ok) {
      return {
        message: 'Failed to fetch data',
        data: null as any,
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
