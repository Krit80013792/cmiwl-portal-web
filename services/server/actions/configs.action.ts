//* app/services/server/actions/configs.action.ts

'use server';
import { ConfigDTO } from '@/src/application/dtos/ConfigDTO';
import { ConfigService } from '@/src/application/services/ConfigService';
import { ConfigRepository } from '@/src/infrastructure/database/mongodb/repositories/ConfigRepository';
import redis from '@/src/shared/utils/redis';

let _configServiceInstance: ConfigService | null = null;

async function ConfigServiceInstance(): Promise<ConfigService> {
    _configServiceInstance ??= new ConfigService(new ConfigRepository());
    return _configServiceInstance;
};

export async function getConfigs(): Promise<ConfigDTO[]> {
    const cacheKey = "Configs:All";
    const cacheTtl = 60 * 60 * 24 * 30; //* 30 Days

    //* Find from cache first
    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached) as ConfigDTO[];
        }
    } catch (err) {
        console.warn("Redis unavailable, fallback to DB:", err);
    }

    //* Fallback to DB
    const configService = await ConfigServiceInstance();
    const configs = await configService.getConfigs();
    const data = configs?.data ?? [];

    //* Cached
    if (data.length > 0) {
        try {
            await redis.set(cacheKey, JSON.stringify(data), "EX", cacheTtl);
        } catch (err) {
            console.warn("Failed to cache configs in Redis:", err);
        }
    }

    return data;
};
