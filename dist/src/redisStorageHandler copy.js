"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorageHandler = void 0;
const ioredis_1 = require("ioredis");
class RedisStorageHandler {
    constructor(ioRedisObject) {
        if (ioRedisObject)
            this.redisConnObject = new ioredis_1.Redis(ioRedisObject);
        else
            this.redisConnObject = new ioredis_1.Redis(); //defailt connect to localhost:6379
    }
    async get(key) {
    }
    async set(key, value) {
    }
    async length() {
        return 0;
    }
}
exports.RedisStorageHandler = RedisStorageHandler;
//# sourceMappingURL=redisStorageHandler copy.js.map