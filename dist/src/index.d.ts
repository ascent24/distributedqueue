import { IStorageHandler } from "./IStorageHandler";
export declare class DistributedQueue {
    private _storageRepositary;
    private _queueName;
    private _connObj;
    constructor(queueName: string, storageRepositary: IStorageHandler, ConnObj?: any);
    initializeStorage(): Promise<boolean>;
    /**
    * Returns whether the  queue is empty or not.
    *
    * @return {Boolean}
    * @api public
    */
    isEmpty(): Promise<boolean>;
    /**
     * Peeks at the top element of the priority queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    peek(): Promise<any>;
    /**
   * Returns the size of the priority queue.
   *
   * @return {Number}
   * @api public
   */
    size(): Promise<number>;
    /**
     * Dequeues the top element of the distributed queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    deq(): Promise<any>;
    /**
   * Dequeues the top element of the distributed queue.
   *
   * @return {Index} of the item just inserted
   * @throws {Error} when the queue is empty.
   * @api public
   */
    enq(object: any): Promise<number>;
    /**
     *
     * remove all object from list. maintains the queue (meta data and others)
     */
    flush(): Promise<boolean>;
}
