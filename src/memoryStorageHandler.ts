import { inherits } from "util";
import { IStorageHandler } from "./IStorageHandler";
 
 

export class MemoryStorage implements IStorageHandler
{
  private storage: Storage;

  public async initializeStorage(name: string, connObject  = null): Promise<boolean>
  {
    this.storage = new Storage();
    this.storage.name = name;
    return    true;
  }

  /**
   * @returns Peek first element from Queue. Does not remove the element
   */
  public async peekElement(): Promise<any> 
  {
    let item = this.storage.peek();
    return  item;
  }

/**
 * 
 * @param value push to last element to Queue. and return new size of queue
 * @returns return new size of queue
 */
  public async pushElement(value: any): Promise<number> 
  {
    let size = this.storage.enq(value);
    return Promise.resolve(size);
  }

  /**
   * @returns pops first element from Queue. remove the element from queue and return it.
   */
  public async popElement(): Promise<any>
  {
    let item = this.storage.deq();
    return Promise.resolve(item);
  }

/**
 * @returns get the length of queue
 */
  public async length(): Promise<number>
  {
    let size = this.storage.size();
    return size;
  }

  /**
* @returns deletes all the list data ONLY from queue. maintain other meta data etc.,
*/
  public async flushStorage(): Promise<boolean>
  {
     
    let done = await this.storage.flush();
    return done;
  }
 
}

 

/**
 * Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @param {Function}
 * @return {PriorityQueue}
 * @api public
 */
class Storage 
{

  private _elements:any[] = [];
  public  name: string;

  constructor()
  {
    this._elements = [];
  }

  public flush()
  {
      this._elements = [];
    return true;
  };

  public isEmpty()
  {
    return this.size() === 0;
  };
  public peek()
  {
    if (this.isEmpty()) throw new Error('DistributedQueue is empty');
    return this._elements[0];
  };

  /**
   * Dequeues the top element of the priority queue.
   *
   * @return {Object}
   * @throws {Error} when the queue is empty.
   * @api public
   */
  public deq ()
  {
     //The shift() method removes the first item of an array.
    var first = this._elements.shift();
    return first;
  };



  /**
   * Enqueues the `element` at the priority queue and returns its new size.
   *
   * @param {Object} element
   * @return {Number}
   * @api public
   */
  public enq (element:any)
  {
    var size = this._elements.push(element);
    return this.size();
  };



  /**
   * Returns the size of the priority queue.
   *
   * @return {Number}
   * @api public
   */
  public size()
  {
    return this._elements.length;
  };

 
 
}

 