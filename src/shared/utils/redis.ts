import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_ENDPOINT || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    db: Number(process.env.REDIS_DEFAULTDATABASE) || 0,
    connectTimeout: (Number(process.env.REDIS_TIMEOUTMINUTES) || 5),
    keyPrefix: process.env.REDIS_CHANNELPREFIX ? `${process.env.REDIS_CHANNELPREFIX}:` : undefined,
});

redis.on("connect", () => {
    //console.log("Connected to Redis");
});

redis.on("error", (err) => {
    //console.error("Redis error:", err);
});

export default redis;
