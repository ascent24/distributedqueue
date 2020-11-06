import { inherits } from "util";
import { IStorageHandler } from "./IStorageHandler";
import { RedisHandler } from "./RedisHandler";
 

class QueueMeta
{
  public createdAt: Date;  
  public queueNameKey: string;
  public queueDataKey: string;

  public toString(): string
  {
    return JSON.stringify(this);
  }
}

export class RedisStorage implements IStorageHandler
{
  public redisStorage: RedisHandler;

  public queueMeta: QueueMeta;
 
  /**
   * 
   * @param name 
   * @param redisConnection same as ioredis connection object. 
   */
  public async initializeStorage(name: string, redisConnection:any): Promise<boolean>
  {
     
    this.redisStorage = new RedisHandler(redisConnection);
    let val = await this.redisStorage.get(name + ":meta")
    if (val != null)
    {
      this.queueMeta = JSON.parse(val);
    }
    else 
    {
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
  public async peekElement(): Promise<any> 
  {
    let item = await this.redisStorage.getList(this.queueMeta.queueDataKey, 0, 0);
    if (item && item.length > 0 )
      return item[0];
    else null;
  }

  /**
   * 
   * @param value push to last element to Queue. and return new size of queue
   * @returns return new size of queue
   */
  public async pushElement(value: string): Promise<number> 
  {
    let size = await this.redisStorage.rightPush ( this.queueMeta.queueDataKey, [value]);
    return size;
  }

  /**
   * @returns pops first element from Queue. remove the element from queue and return it.
   */
  public async popElement(): Promise<any>
  {
    let item = await this.redisStorage.leftPop(this.queueMeta.queueDataKey);
    return item;
  }

  /**
   * @returns get the length of queue
   */
  public async length(): Promise<number>
  {
    let key = this.queueMeta.queueDataKey;
    let size = await this.redisStorage.getListLength(this.queueMeta.queueDataKey);
    return size;
  }
 
  /**
  * @returns deletes all the list data ONLY from queue. maintain other meta data etc.,
  */
  public async flushStorage(): Promise<boolean>
  {
    let key = this.queueMeta.queueDataKey;
    let size = await this.redisStorage.delete(this.queueMeta.queueDataKey);
    return (size >=0)?true:false;
  }
}


 