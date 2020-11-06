import { IStorageHandler } from "./IStorageHandler";

export class DistributedQueue
{
  private _storageRepositary: IStorageHandler;
  private _queueName: string;
  private _connObj: any;
  constructor(queueName : string, storageRepositary:IStorageHandler,ConnObj?:any)
  {
    this._queueName = queueName;
    this._storageRepositary = storageRepositary;// || DistributedQueue.DEFAULT_COMPARATOR;
   
    this._queueName = queueName;
    this._connObj = ConnObj;

  }

  public async  initializeStorage()
  {
    await this._storageRepositary.initializeStorage(this._queueName, this._connObj);
    return true;
  }


 /**
 * Returns whether the  queue is empty or not.
 *
 * @return {Boolean}
 * @api public
 */
  public async  isEmpty()
  {
    let x = await this._storageRepositary.length();
    let res = (x === 0);
    return  res;
  };

/**
 * Peeks at the top element of the priority queue.
 *
 * @return {Object}
 * @throws {Error} when the queue is empty.
 * @api public
 */
 public async peek()
  {
   

    

     if (!await this.isEmpty())
        
     //possible to throw error if any other object removes the last element from queue.
     return await this._storageRepositary.peekElement();
  
    
  };


  /**
 * Returns the size of the priority queue.
 *
 * @return {Number}
 * @api public
 */
  public async size()
  {
    return await this._storageRepositary.length();
  };


  /**
   * Dequeues the top element of the distributed queue.
   *
   * @return {Object}
   * @throws {Error} when the queue is empty.
   * @api public
   */
  public async deq():Promise<any>
  { 
    return this._storageRepositary.popElement();
  };

  /**
 * Dequeues the top element of the distributed queue.
 *
 * @return {Index} of the item just inserted
 * @throws {Error} when the queue is empty.
 * @api public
 */
  public async enq(object:any): Promise<number>
  {
    return  await this._storageRepositary.pushElement(object);
  };

   /**
    * 
    * remove all object from list. maintains the queue (meta data and others)
    */
  public async flush(): Promise<boolean>
  {
    return await this._storageRepositary.flushStorage();
  };
}