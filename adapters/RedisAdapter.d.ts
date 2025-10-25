export declare class RedisAdapter {
    private client;
    private logger;
    constructor(url: string);
    set(key: string, value: any, ttl?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
}
