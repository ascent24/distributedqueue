export declare class RedisStorageHandler {
    private redisConnObject;
    constructor(ioRedisObject: any);
    get(key: string): Promise<void>;
    set(key: string, value: any): Promise<void>;
    length(): Promise<number>;
}
