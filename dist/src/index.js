"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedQueue = void 0;
__exportStar(require("./IStorageHandler"), exports);
__exportStar(require("./RedisHandler"), exports);
__exportStar(require("./memoryStorageHandler"), exports);
__exportStar(require("./redisStorageHandler"), exports);
class DistributedQueue {
    constructor(queueName, storageRepositary, ConnObj) {
        this._queueName = queueName;
        this._storageRepositary = storageRepositary; // || DistributedQueue.DEFAULT_COMPARATOR;
        this._queueName = queueName;
        this._connObj = ConnObj;
    }
    async initializeStorage() {
        await this._storageRepositary.initializeStorage(this._queueName, this._connObj);
        return true;
    }
    /**
    * Returns whether the  queue is empty or not.
    *
    * @return {Boolean}
    * @api public
    */
    async isEmpty() {
        let x = await this._storageRepositary.length();
        let res = (x === 0);
        return res;
    }
    ;
    /**
     * Peeks at the top element of the priority queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    async peek() {
        if (!await this.isEmpty())
            //possible to throw error if any other object removes the last element from queue.
            return await this._storageRepositary.peekElement();
    }
    ;
    /**
   * Returns the size of the priority queue.
   *
   * @return {Number}
   * @api public
   */
    async size() {
        return await this._storageRepositary.length();
    }
    ;
    /**
     * Dequeues the top element of the distributed queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    async deq() {
        return this._storageRepositary.popElement();
    }
    ;
    /**
   * Dequeues the top element of the distributed queue.
   *
   * @return {Index} of the item just inserted
   * @throws {Error} when the queue is empty.
   * @api public
   */
    async enq(object) {
        return await this._storageRepositary.pushElement(object);
    }
    ;
    /**
     *
     * remove all object from list. maintains the queue (meta data and others)
     */
    async flush() {
        return await this._storageRepositary.flushStorage();
    }
    ;
}
exports.DistributedQueue = DistributedQueue;
//# sourceMappingURL=index.js.map