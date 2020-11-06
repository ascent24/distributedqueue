"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('expect.js');
const index_1 = require("../src/index");
const MemoryStorageHandler_1 = require("../src/MemoryStorageHandler");
const unittesthelper_1 = require("./unittesthelper");
let queuename = "MyQueue_UNITTEST";
describe('DistributedQueue()', function () {
    it('returns an new DistributedQueue', function () {
        let storage = new MemoryStorageHandler_1.MemoryStorage();
        expect(new index_1.DistributedQueue(queuename, storage)).to.be.a(index_1.DistributedQueue);
    });
    describe('#isEmpty()', function () {
        it('returns true when the queue is empty', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            let isEmpty = await queue.isEmpty();
            expect(isEmpty).to.be(true);
        });
        it('returns false when the queue is not empty', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            expect(await queue.isEmpty()).to.be(false);
        });
    });
    describe('#peek()', function () {
        it('fails when the queue is empty', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            unittesthelper_1.expectThrowsAsync(queue.peek, [], 'DistributedQueue is empty');
            unittesthelper_1.expectThrowsAsync(queue.peek, [], 'DistributedQueue is empty');
            await queue.enq('jano');
        });
        it('returns the top element of the queue', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            await queue.enq('valentina');
            await queue.enq('zombie');
            await queue.enq('fran');
            await queue.enq('albert');
            await queue.enq('albert');
            await queue.enq('frank');
            expect(await queue.peek()).to.be('jano');
        });
    });
    describe('#deq()', function () {
        it('fails when the queue is empty', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            unittesthelper_1.expectThrowsAsync(queue.deq, [], 'DistributedQueue is empty');
        });
        it('dequeues the top element of the queue', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            await queue.enq('valentina');
            await queue.enq('zombie');
            await queue.enq('fran');
            await queue.enq('albert');
            await queue.enq('albert');
            await queue.enq('frank');
            await queue.enq('jano');
            await queue.enq('valentina');
            await queue.enq('zombie');
            expect(await queue.deq()).to.be('jano');
            expect(await queue.deq()).to.be('valentina');
            expect(await queue.deq()).to.be('zombie');
            expect(await queue.deq()).to.be('fran');
            expect(await queue.deq()).to.be('albert');
            expect(await queue.deq()).to.be('albert');
            expect(await queue.deq()).to.be('frank');
            expect(await queue.deq()).to.be('jano');
            expect(await queue.deq()).to.be('valentina');
            expect(await queue.deq()).to.be('zombie');
            expect(await queue.isEmpty()).to.be(true);
        });
        it('not fails with only one element', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            expect(await queue.deq()).to.be('jano');
            expect(await queue.size()).to.be(0);
        });
    });
    describe('#enq()', function () {
        it('enqueues an element at the end of the queue', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            await queue.enq('valentina');
            await queue.enq('fran');
            expect(await queue.peek()).to.be('jano');
            expect(await queue.size()).to.be(3);
        });
        it('returns the new size of the queue', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            expect(await queue.enq('jano')).to.be(1);
        });
    });
    describe('#size()', function () {
        it('returns 0 when the queue is empty', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            expect(await queue.size()).to.be(0);
        });
        it('returns the size of the queue', async function () {
            let storage = new MemoryStorageHandler_1.MemoryStorage();
            var queue = new index_1.DistributedQueue(queuename, storage);
            await queue.initializeStorage();
            await queue.enq('jano');
            await queue.enq('valentina');
            expect(await queue.size()).to.be(2);
        });
    });
    /*
      describe('#forEach()', function() {
        it('iterates over all queue elements', function () {
          var queue = new DistributedQueue();
          await queue.enq('a');
          await queue.enq('b');
          var iteration = [];
    
          await queue.forEach(function(element, index) {
            iteration.push([element, index]);
          });
    
          expect(iteration.length).to.be(2);
          expect(iteration[0][0]).to.be.eql('b');
          expect(iteration[0][1]).to.be.eql(0);
          expect(iteration[1][0]).to.be.eql('a');
          expect(iteration[1][1]).to.be.eql(1);
        });
      });
    */
});
//# sourceMappingURL=memory.queue.test.js.map