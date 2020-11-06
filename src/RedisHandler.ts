const Redis = require("async-redis");
/**
 * The only Redis Interface you need !!!
 */
export class RedisHandler
{
    private cacheClient;

    /**
     * 
     * @param redisConnObj https://redis.js.org/#-api-connection-and-other-events
     * {host:"localhost", port : 6379 , password:null}
     */
    constructor(redisConnObj:any)
    {
        this.cacheClient = Redis.createClient(redisConnObj);
    }

    /**
     * //refers :https://redis.io/commands/get
     * @param key the key to be retrieved
     * @returns Null if key does not exist. otherwise, unparsed string value 
     * @throws exception in case of any error
     */
    public async get(key: string): Promise<any>
    {
        try
        {
            let value = await this.cacheClient.get(key);
            if (value == "nil" || value ==null ) return null;
            return value;
        }
        catch (err)
        {
            throw err;
        }
    }

    /**
     * 
     * @param key key string
     * @param value  value to be stored as string
     * @param TTLinSec optionally set TTL in Seconds.
     * @returns true or false if properly stored. 
     * @throws exception in case of error.
     */
    public async put(key: string, value: string, TTLinSec?: number): Promise<boolean>
    {
        try
        {
             
             
            let result: boolean = false;
            //refers :https://redis.io/commands/set
            let setValue: string;
            if (typeof TTLinSec !== "undefined")
                setValue = await this.cacheClient.set(key, value, "EX", TTLinSec);
            else 
                setValue = await this.cacheClient.set(key, value);
            
            result = (setValue == "OK") ? true : false;
            return result;
        }
        catch (err)
        {
            throw err;
        }
    }

    // public async getMany(keys: string[])
    // {
    //     try
    //     {
    //         let values = await this.cacheClient.mget(keys);
    //         if (values == "nil") return null;
    //         let valueArray: any[] = [];
    //         for (let value of values)
    //         {
    //             if (value && value != "nil")
    //             {
    //                 valueArray.push(value);
    //             }
    //         }
    //         return valueArray;
    //     }
    //     catch (err)
    //     {
    //     throw err
    //     }
    // }

    // /**
    //  *
    //  * @param keyValuePairs [key1,value1,key2,value2,key3,value3]
    //  */
    // public async putMany(keyValuePairs: any[], TTLinSec: number): Promise<boolean>
    // {
    //     try
    //     {
    //         let compressedKeyValuesPairs: any[] = this.compressValues(keyValuePairs);
    //         let result: string = await this.cacheClient.mset(
    //             ...compressedKeyValuesPairs,
    //             "EX",
    //             TTLinSec
    //         );
    //         let isStored: boolean = result == "OK" ? true : false;
    //         return isStored;
    //     } catch (err)
    //     {
    //         throw err;
    //     }
    // }

  
   /**
    * 
    * @param key The key of key-value pair to be deleted. Removes the specified keys. A key is ignored if it does not exist.
    * @returns the number of keys deleted . In case if key does not exists, it simply ignored.
    * @throws exception if any
    */
    public async delete(key: string): Promise<any>
    {
        try
        {
            let value = await this.cacheClient.del(key);
            //refers :https://redis.io/commands/del
            let result = value;
            return result;
        }
        catch (err)
        {
            throw err;
        }
    }
    

    /**
     * Pushes element(s) to left side. I mean head of the list
     * 1, 2, 3 . List to be inserted 4,5,6 =>   6,5,4,1,2,3
     * @param key  stores a list under the single key. The items are inserted from left to right. Key will be inserted if it  does not exist.
     * @param values  Array of values to be inserted. Left most values (0th index) will be inserted to list first
     * @param TTLinSec Optionally set TTL in seconds
     * @returns lpush returns the size of the list , after pushing the elements
     */
    
    
    public async leftPush(key: string, values: string[],TTLinSec? :number): Promise<boolean>
    {
        try
        {
            let result: number = await this.cacheClient.lpush(key, [...values]);
            if (TTLinSec)
                await this.cacheClient.EXPIRE(key, TTLinSec);
            if (result < values.length)
            {
                throw new Error("Error occurred while storing list");
            }
            return true;
        } catch (err)
        {
            throw err;
        }
    }


    /**
 * Pushes element(s) to right side. I mean tail of the list (https://redis.io/commands/rpush)
 * 1, 2, 3 . List to be inserted 4,5,6 =>   1,2,3,4,5,6
 * @param key  stores a list under the single key. The items are inserted from left to right. Key will be inserted if it  does not exist.
 * @param values  Array of values to be inserted. Left most values (0th index) will be inserted to list first
 * @param TTLinSec Optionally set TTL in seconds
 * @returns rightpush returns the size of the list , after pushing the elements
 */


    public async rightPush(key: string, values: string[], TTLinSec?: number): Promise<number>
    {
        try
        {
            let result: number = await this.cacheClient.rpush(key, [...values]);
            if (TTLinSec)
                await this.cacheClient.EXPIRE(key, TTLinSec);
            if (result < values.length)
            {
                throw new Error("Error occurred while storing list");
            }
            return result;
        } catch (err)
        {
            throw err;
        }
    }

/**
  * Pops element(s) from left side. I mean head of the list
  * @param key   key
  * @returns returns the element popped. if key does not exist return null.
  * @throws error if any.
  */
    public async leftPop(key: string): Promise<any>
    {
        try
        {
            let result: any = await this.cacheClient.lpop(key);
            if (result == "nil" || result == null) throw new Error("Queue is empty");
            return result;
        }
        catch (err)
        {
            throw err;
        }
    }

  /**
  * Pops element(s) from right side of queue. I mean tail of the list
  * @param key   key
  * @returns returns the element popped. if key does not exist return null.
  * @throws error if any.
  */
    public async rightPop(key: string): Promise<any>
    {
        try
        {
            let result: any = await this.cacheClient.rpop(key);
            if (result == "nil" || result == null) throw new Error("Queue is empty");
            return result;
        }
        catch (err)
        {
            throw err;
        }
    }

 
    /**
     * get the array of elements for the given key
     * @param key if key does not exist, returns empty array
     * @param startIndex The offsets start and stop are zero-based indexes, with 0 being the first element of the list
     * @param stopIndex Returns the specified elements of the list stored at key. The offsets start and stop are zero-based indexes, with 0 being the first element of the list (the head of the list), 1 being the next element and so on.
                        These offsets can also be negative numbers indicating offsets starting at the end of the list. For example, -1 is the last element of the list, -2 the penultimate, and so on.
     * @returns returns array of unparsed values. or empty array.
                if start , stop not specified, returs all unparsed elements in list
     */
    public async getList(key: string,startIndex?:number,stopIndex?:number):Promise<any[]>
    {
        try
        {
            let list: any[]=[];
            if (typeof startIndex !== "undefined" && typeof stopIndex !== "undefined" )
                list = await this.cacheClient.lrange(key, startIndex, stopIndex);
            else if (typeof startIndex !== "undefined" && typeof stopIndex === "undefined")
                list = await this.cacheClient.lrange(key, startIndex, -1);
            else if (typeof startIndex === "undefined" && typeof stopIndex !== "undefined")
                list = await this.cacheClient.lrange(key, 0, stopIndex);
            else if (typeof startIndex === "undefined" && typeof stopIndex === "undefined")
                list = await this.cacheClient.lrange(key, 0, -1);
            
            return list;
        }
        catch (err)
        {
            throw err;
        }
    }

    /**
    * length of the list
    * @param key if key does not exist, returns empty array
    * @returns Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty list and 0 is returned. An error is returned when the value stored at key is not a list.
    */
    public async getListLength(key: string): Promise<number>
    {
        try
        {
            let    l = await this.cacheClient.llen(key);
            return l;
        }
        catch (err)
        {
            throw err;
        }
    }
}