import Redis from 'ioredis';
import { Logger } from '../core/Logger';

export class RedisAdapter {
    private client: Redis;
    private logger = new Logger('RedisAdapter');

    constructor(url: string) {
        this.client = new Redis(url);
    }

    async set(key: string, value: any, ttl?: number) {
        const data = JSON.stringify(value);
        ttl ? await this.client.setex(key, ttl, data) : await this.client.set(key, data);
    }

    async get<T>(key: string): Promise<T | null> {
        const val = await this.client.get(key);
        return val ? (JSON.parse(val) as T) : null;
    }

    async del(key: string) {
        await this.client.del(key);
    }
}
