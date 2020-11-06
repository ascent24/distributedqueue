"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorage = void 0;
class MemoryStorage {
    async initializeStorage(name, connObject = null) {
        this.storage = new Storage();
        this.storage.name = name;
        return true;
    }
    /**
     * @returns Peek first element from Queue. Does not remove the element
     */
    async peekElement() {
        let item = this.storage.peek();
        return item;
    }
    /**
     *
     * @param value push to last element to Queue. and return new size of queue
     * @returns return new size of queue
     */
    async pushElement(value) {
        let size = this.storage.enq(value);
        return Promise.resolve(size);
    }
    /**
     * @returns pops first element from Queue. remove the element from queue and return it.
     */
    async popElement() {
        let item = this.storage.deq();
        return Promise.resolve(item);
    }
    /**
     * @returns get the length of queue
     */
    async length() {
        let size = this.storage.size();
        return size;
    }
}
exports.MemoryStorage = MemoryStorage;
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
class Storage {
    constructor() {
        this._elements = [];
        this._elements = [];
    }
    isEmpty() {
        return this.size() === 0;
    }
    ;
    peek() {
        if (this.isEmpty())
            throw new Error('DistributedQueue is empty');
        return this._elements[0];
    }
    ;
    /**
     * Dequeues the top element of the priority queue.
     *
     * @return {Object}
     * @throws {Error} when the queue is empty.
     * @api public
     */
    deq() {
        //The shift() method removes the first item of an array.
        var first = this._elements.shift();
        return first;
    }
    ;
    /**
     * Enqueues the `element` at the priority queue and returns its new size.
     *
     * @param {Object} element
     * @return {Number}
     * @api public
     */
    enq(element) {
        var size = this._elements.push(element);
        return this.size();
    }
    ;
    /**
     * Returns the size of the priority queue.
     *
     * @return {Number}
     * @api public
     */
    size() {
        return this._elements.length;
    }
    ;
}
//# sourceMappingURL=memoryStorageHandler.js.map