"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorage = void 0;
const RedisHandler_1 = require("./RedisHandler");
class QueueMeta {
    toString() {
        return JSON.stringify(this);
    }
}
class RedisStorage {
    /**
     *
     * @param name
     * @param redisConnection same as ioredis connection object.
     */
    async initializeStorage(name, redisConnection) {
        this.redisStorage = new RedisHandler_1.RedisHandler(redisConnection);
        let val = await this.redisStorage.get(name + ":meta");
        if (val != null) {
            this.queueMeta = JSON.parse(val);
        }
        else {
            this.queueMeta = new QueueMeta();
            this.queueMeta.queueNameKey = name;
            this.queueMeta.queueDataKey = name + ":data";
            this.queueMeta.createdAt = new Date();
            let val = await this.redisStorage.put(name + ":meta", JSON.stringify(this.queueMeta));
        }
        return true;
    }
    /**
     * @returns Peek first element from Queue. Does not remove the element. if there is no element, return null
     */
    async peekElement() {
        let item = await this.redisStorage.getList(this.queueMeta.queueDataKey, 0, 0);
        if (item && item.length > 0)
            return item[0];
        else
            null;
    }
    /**
     *
     * @param value push to last element to Queue. and return new size of queue
     * @returns return new size of queue
     */
    async pushElement(value) {
        let size = await this.redisStorage.rightPush(this.queueMeta.queueDataKey, [value]);
        return size;
    }
    /**
     * @returns pops first element from Queue. remove the element from queue and return it.
     */
    async popElement() {
        let item = await this.redisStorage.leftPop(this.queueMeta.queueDataKey);
        return item;
    }
    /**
     * @returns get the length of queue
     */
    async length() {
        let key = this.queueMeta.queueDataKey;
        let size = await this.redisStorage.getListLength(this.queueMeta.queueDataKey);
        return size;
    }
    /**
    * @returns deletes all the list data ONLY from queue. maintain other meta data etc.,
    */
    async flushStorage() {
        let key = this.queueMeta.queueDataKey;
        let size = await this.redisStorage.delete(this.queueMeta.queueDataKey);
        return (size >= 0) ? true : false;
    }
}
exports.RedisStorage = RedisStorage;
//# sourceMappingURL=redisStorageHandler.js.map