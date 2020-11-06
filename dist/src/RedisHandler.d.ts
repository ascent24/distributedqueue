/**
 * The only Redis Interface you need !!!
 */
export declare class RedisHandler {
    private cacheClient;
    /**
     *
     * @param redisConnObj https://redis.js.org/#-api-connection-and-other-events
     * {host:"localhost", port : 6379 , password:null}
     */
    constructor(redisConnObj: any);
    /**
     * //refers :https://redis.io/commands/get
     * @param key the key to be retrieved
     * @returns Null if key does not exist. otherwise, unparsed string value
     * @throws exception in case of any error
     */
    get(key: string): Promise<any>;
    /**
     *
     * @param key key string
     * @param value  value to be stored as string
     * @param TTLinSec optionally set TTL in Seconds.
     * @returns true or false if properly stored.
     * @throws exception in case of error.
     */
    put(key: string, value: string, TTLinSec?: number): Promise<boolean>;
    /**
     *
     * @param key The key of key-value pair to be deleted. Removes the specified keys. A key is ignored if it does not exist.
     * @returns the number of keys deleted . In case if key does not exists, it simply ignored.
     * @throws exception if any
     */
    delete(key: string): Promise<any>;
    /**
     * Pushes element(s) to left side. I mean head of the list
     * 1, 2, 3 . List to be inserted 4,5,6 =>   6,5,4,1,2,3
     * @param key  stores a list under the single key. The items are inserted from left to right. Key will be inserted if it  does not exist.
     * @param values  Array of values to be inserted. Left most values (0th index) will be inserted to list first
     * @param TTLinSec Optionally set TTL in seconds
     * @returns lpush returns the size of the list , after pushing the elements
     */
    leftPush(key: string, values: string[], TTLinSec?: number): Promise<boolean>;
    /**
 * Pushes element(s) to right side. I mean tail of the list (https://redis.io/commands/rpush)
 * 1, 2, 3 . List to be inserted 4,5,6 =>   1,2,3,4,5,6
 * @param key  stores a list under the single key. The items are inserted from left to right. Key will be inserted if it  does not exist.
 * @param values  Array of values to be inserted. Left most values (0th index) will be inserted to list first
 * @param TTLinSec Optionally set TTL in seconds
 * @returns rightpush returns the size of the list , after pushing the elements
 */
    rightPush(key: string, values: string[], TTLinSec?: number): Promise<number>;
    /**
      * Pops element(s) from left side. I mean head of the list
      * @param key   key
      * @returns returns the element popped. if key does not exist return null.
      * @throws error if any.
      */
    leftPop(key: string): Promise<any>;
    /**
    * Pops element(s) from right side of queue. I mean tail of the list
    * @param key   key
    * @returns returns the element popped. if key does not exist return null.
    * @throws error if any.
    */
    rightPop(key: string): Promise<any>;
    /**
     * get the array of elements for the given key
     * @param key if key does not exist, returns empty array
     * @param startIndex The offsets start and stop are zero-based indexes, with 0 being the first element of the list
     * @param stopIndex Returns the specified elements of the list stored at key. The offsets start and stop are zero-based indexes, with 0 being the first element of the list (the head of the list), 1 being the next element and so on.
                        These offsets can also be negative numbers indicating offsets starting at the end of the list. For example, -1 is the last element of the list, -2 the penultimate, and so on.
     * @returns returns array of unparsed values. or empty array.
                if start , stop not specified, returs all unparsed elements in list
     */
    getList(key: string, startIndex?: number, stopIndex?: number): Promise<any[]>;
    /**
    * length of the list
    * @param key if key does not exist, returns empty array
    * @returns Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty list and 0 is returned. An error is returned when the value stored at key is not a list.
    */
    getListLength(key: string): Promise<number>;
}
