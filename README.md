# DistributedQueue

 


<p align="center">
  <a href="https://ascent24.io/" target="blank"><img src="https://www.ascent24.io/wp-content/uploads/2019/04/Logo_160px.png" width="160" alt="Ascent24 Technologies Logo" /></a>
</p>

A simple distributed queue data structure for Node.js. Backed by Redis.

100% Fully covered in Mocha Unit Tests.

Pull requests are welcome.

Heavily inspired by priorityqueuejs ``` https://github.com/janogonzalez/priorityqueuejs ```

## Installation

```
npm install distributedqueue
```

## Example

```ts

  let storage = new RedisStorage();
  let queuename = "<NameoftheQueue>"

  //same as ioredis connection object. 
  redisConnObj = {  
     host: "localhost",
     port: 6379,
  }
  var queue = new DistributedQueue(queuename, storage, redisConnObj);
  await queue.initializeStorage();
  await queue.flush();//Becareful on this. will flush all items in the queue
  await queue.enq('jano');
  await queue.enq('valentina');
  await queue.peek()
  await queue.isEmpty() 
```

## API

### `DistributedQueue()`

Initializes a new empty `DistributedQueue` object

### `object.initializeStorage();`

Initializes a new empty `DistributedQueue` in redis OR connect to already existing queue created by other servers.



### `object.deq()`

Dequeues the top element of the distributed queue.
Throws an `Error` when the queue is empty.

### `object.enq(element)`

Enqueues the `element` at the distributed queue and returns its new size.

### `object.flush()`

Flushes all the items in the current queue. Does not alter/remove metadata about this queue.
 Just be careful this will delete all items in the queue in redis as well.


### `object.isEmpty()`

Returns whether the distributed queue is empty or not.

### `object.peek()`

Peeks at the top element of the distributed queue.
Throws an `Error` when the queue is empty.

### `object.size()`

Returns the size of the distributed queue.

## Testing

```
npm install
npm test

```
```
  DistributedQueue()
    √ returns an new DistributedQueue
    #isEmpty()
      √ returns true when the queue is empty
      √ returns false when the queue is not empty
    #peek()
      √ fails when the queue is empty
      √ returns the top element of the queue
    #deq()
      √ fails when the queue is empty
      √ dequeues the top element of the queue
      √ not fails with only one element
    #enq()
      √ enqueues an element at the end of the queue
      √ returns the new size of the queue
    #size()
      √ returns 0 when the queue is empty
      √ returns the size of the queue

  51 passing (16s)
```

## Stay in touch
- Author - [Thiyaga](https://twitter.com/@thiyagak)
- Website - [https://www.ascent24.io](https://ascent24.io/)
- Twitter - [@Ascent24T](https://twitter.com/Ascent24T)

## About Ascent24 Technologies

- [Ascent24 Technologies](https://www.ascent24.io/reach-us/), An Innovative digital products developer & service provider for Startups & well-established software companies. We are specialised in developing high performance Software Applications,  Specifically expert in Travel, Airline, Hotel Industry.

## Licence

MIT

