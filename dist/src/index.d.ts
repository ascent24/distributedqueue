import { IStorageHandler } from "./IStorageHandler";
export declare class DistributedQueue {
    private _storageRepositary;
    private _queueName;
    constructor(queueName: string, storageRepositary: IStorageHandler, ConnObj?: any);
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
     * Dequeues the top element of the priority queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    deq(): Promise<any>;
    /**
   * Dequeues the top element of the priority queue.
   *
   * @return {Index} of the item just inserted
   * @throws {Error} when the queue is empty.
   * @api public
   */
    enq(object: any): Promise<number>;
}
