import { IStorageHandler } from "./IStorageHandler";
import { RedisHandler } from "./RedisHandler";
declare class QueueMeta {
    createdAt: Date;
    queueNameKey: string;
    queueDataKey: string;
    toString(): string;
}
export declare class RedisStorage implements IStorageHandler {
    redisStorage: RedisHandler;
    queueMeta: QueueMeta;
    /**
     *
     * @param name
     * @param redisConnection same as ioredis connection object.
     */
    initializeStorage(name: string, redisConnection: any): Promise<boolean>;
    /**
     * @returns Peek first element from Queue. Does not remove the element. if there is no element, return null
     */
    peekElement(): Promise<any>;
    /**
     *
     * @param value push to last element to Queue. and return new size of queue
     * @returns return new size of queue
     */
    pushElement(value: string): Promise<number>;
    /**
     * @returns pops first element from Queue. remove the element from queue and return it.
     */
    popElement(): Promise<any>;
    /**
     * @returns get the length of queue
     */
    length(): Promise<number>;
    /**
    * @returns deletes all the list data ONLY from queue. maintain other meta data etc.,
    */
    flushStorage(): Promise<boolean>;
}
export {};
