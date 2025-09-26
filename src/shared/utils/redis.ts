import Redis from 'ioredis'

const connectTimeoutMinutes = Number(process.env.REDIS_TIMEOUTMINUTES) || 5
const connectTimeoutMs = connectTimeoutMinutes * 60 * 1000

const redis = new Redis({
  host: process.env.REDIS_ENDPOINT || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  ...(process.env.REDIS_USERNAME ? { username: process.env.REDIS_USERNAME } : {}),
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DEFAULTDATABASE) || 0,
  connectTimeout: connectTimeoutMs,
  keyPrefix: process.env.REDIS_CHANNELPREFIX ? `${process.env.REDIS_CHANNELPREFIX}:` : undefined,
  maxRetriesPerRequest: 3,
  lazyConnect: false, // Connect immediately
})

redis.on('connect', () => {
  console.log('Connected to Redis')
})

redis.on('error', (err) => {
  // console.error('Redis error:', err)
})

export default redis
