"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const unittesthelper_1 = require("./unittesthelper");
const RedisHandler_1 = require("../src/RedisHandler");
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });
let keyPrefix = process.env.QUEUE_REDIS_KEY_PREFIX || "";
let redisConnObj = {
    host: process.env.QUEUE_REDIS_HOST,
    port: process.env.QUEUE_REDIS_PORT,
    password: process.env.QUEUE_REDIS_PASSWORD
};
describe('RedisStorage()', function () {
    it('returns an new RedisStorage', function () {
        let storage = new RedisHandler_1.RedisHandler(redisConnObj);
        chai_1.expect(new RedisHandler_1.RedisHandler(redisConnObj) instanceof RedisHandler_1.RedisHandler).to.be.true;
    });
    describe('#put()', function () {
        it('returns true if put success key successfully stored', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "puttest", "HiHi");
            chai_1.expect(result).to.be.true;
        });
        it('returns true if put success Put Object', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "puttest11", JSON.stringify({ "key": 1, "name": "thiyaga" }));
            let resultnull = await storage.get(keyPrefix + "puttest11"); //1 second
            resultnull = JSON.parse(resultnull);
            chai_1.expect(resultnull.key).to.be.equal(1);
            chai_1.expect(resultnull.name).to.be.equal("thiyaga");
        });
        it('returns true if put success key successfully stored with TTL', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "puttest", "HiHi", 20);
            chai_1.expect(result).to.be.true;
        });
        it('TTL checking if expired after put', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "puttest", "HiHi", 1); //1 second
            unittesthelper_1.sleep(1.1); //sleep for 1 second
            let resultnull = await storage.get(keyPrefix + "puttest"); //1 second
            chai_1.expect(resultnull).to.be.null; //should be null. key should not exist.
        });
        it('TTL checking if not expired after put', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "puttest", "HiHi", 10); //1 second
            unittesthelper_1.sleep(1); //sleep for 1 second
            let resultnull = await storage.get(keyPrefix + "puttest"); //1 second
            chai_1.expect(resultnull).to.be.equal("HiHi");
            //should not be null. key should exist.
        });
    });
    describe('#get()', function () {
        it('returns value if get  successfully retrieved value', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "gettest", "HiHi", 10);
            let resultToTest = await storage.get(keyPrefix + "gettest");
            chai_1.expect(resultToTest).to.be.equal("HiHi");
        });
        it('returns null if get  unsuccessfully retrieved unknownkey', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let resultToTest = await storage.get(keyPrefix + "gettest1231232312");
            chai_1.expect(resultToTest).to.be.null;
        });
    });
    describe('#delete()', function () {
        it('returns value if delete  successfully deleted key-pair', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.put(keyPrefix + "deletetest", "HiHi", 10);
            let resultToTest = await storage.delete(keyPrefix + "deletetest");
            chai_1.expect(resultToTest).to.be.equal(1);
        });
        it('Deleting nonexistant key', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let resultToTest = await storage.delete(keyPrefix + "gettest1231232312");
            chai_1.expect(resultToTest).to.be.equal(0);
        });
    });
    describe('#leftPush()', function () {
        it('returns true if lpush success key successfully stored', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.leftPush(keyPrefix + "PushTest", ["A", "B", "C"]);
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(result).to.be.true;
        });
        it('TTL checking if expired after lPush', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.leftPush(keyPrefix + "PushTest", ["A", "B", "C"], 1); //1 second
            unittesthelper_1.sleep(1.1); //sleep for 1 second
            let resultnull = await storage.getList(keyPrefix + "PushTest"); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resultnull).to.be.instanceof(Array);
            chai_1.expect(resultnull).to.have.length(0);
            //should be null. key should not exist.
        });
        it('TTL checking if NOT expired after lPush', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.leftPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            unittesthelper_1.sleep(1); //sleep for 1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest"); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(3); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["C", "B", "A"]);
        });
    });
    describe('#rightPush()', function () {
        it('returns true if rpush success key successfully stored', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let resultcount = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"]);
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resultcount).to.be.equal(3);
        });
        it('TTL checking if expired after rPush', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 1); //1 second
            unittesthelper_1.sleep(1.1); //sleep for 1 second
            let resultnull = await storage.getList(keyPrefix + "PushTest"); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resultnull).to.be.instanceof(Array);
            chai_1.expect(resultnull).to.have.length(0);
            //should be null. key should not exist.
        });
        it('TTL checking if NOT expired after rPush', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            unittesthelper_1.sleep(1); //sleep for 1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest"); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(3); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["A", "B", "C"]);
        });
    });
    describe('#leftPop()', function () {
        it('returns element, leftPop success key successfully retrieved', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest1", ["A", "B", "C"]);
            let resultToTest = await storage.leftPop(keyPrefix + "PushTest1");
            let del = await storage.delete(keyPrefix + "PushTest1");
            chai_1.expect(resultToTest).to.be.equal("A");
        });
        it('returns element, leftPop success key unknown key', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            //let resultToTest = await storage.leftPop(keyPrefix + "PushTest1");
            unittesthelper_1.expectThrowsAsync(await storage.leftPop, [keyPrefix + "PushTest1"], 'Queue is empty');
            //expect(resultToTest).to.be.null;
        });
        it('checking Queue functionality', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTestA", ["A", "B", "C", "D"]); //1 second
            let resultA = await storage.leftPop(keyPrefix + "PushTestA");
            let resultB = await storage.leftPop(keyPrefix + "PushTestA");
            let resultC = await storage.leftPop(keyPrefix + "PushTestA");
            let resultD = await storage.leftPop(keyPrefix + "PushTestA");
            unittesthelper_1.expectThrowsAsync(await storage.leftPop, [keyPrefix + "PushTest1"], 'Queue is empty');
            chai_1.expect(resultA).to.be.equal("A");
            chai_1.expect(resultB).to.be.equal("B");
            chai_1.expect(resultC).to.be.equal("C");
            chai_1.expect(resultD).to.be.equal("D");
            // expect(resultNULL).to.be.null;
        });
    });
    describe('#right Pop()', function () {
        it('returns element, rightPop success key successfully retrieved', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest1", ["A", "B", "C"]);
            let resultToTest = await storage.rightPop(keyPrefix + "PushTest1");
            let del = await storage.delete(keyPrefix + "PushTest1");
            chai_1.expect(resultToTest).to.be.equal("C");
        });
        it('returns element, rightPop success key unknown key', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            //let resultToTest = await storage.rightPop(keyPrefix + "PushTest1");
            unittesthelper_1.expectThrowsAsync(await storage.rightPop, [keyPrefix + "PushTest1"], 'Queue is empty');
            //expect(resultToTest).to.be.null;
        });
        it('checking Queue functionality', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTestA", ["A", "B", "C", "D"]); //1 second
            let resultA = await storage.rightPop(keyPrefix + "PushTestA");
            let resultB = await storage.rightPop(keyPrefix + "PushTestA");
            let resultC = await storage.rightPop(keyPrefix + "PushTestA");
            let resultD = await storage.rightPop(keyPrefix + "PushTestA");
            unittesthelper_1.expectThrowsAsync(await storage.rightPop, [keyPrefix + "PushTestA"], 'Queue is empty');
            chai_1.expect(resultA).to.be.equal("D");
            chai_1.expect(resultB).to.be.equal("C");
            chai_1.expect(resultC).to.be.equal("B");
            chai_1.expect(resultD).to.be.equal("A");
        });
    });
    describe('#get List()', function () {
        it('Plain Get List', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            //sleep(1); //sleep for 1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest"); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(3); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["A", "B", "C"]);
        });
        it('Plain Get List Empty List', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let resulttoCheck = await storage.getList(keyPrefix + "PushTestAAAAAAA"); //1 second
            chai_1.expect(resulttoCheck).instanceOf(Array);
            chai_1.expect(resulttoCheck.length).equal(0); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members([]);
        });
        it('Plain Get List StartIndex', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest", 1); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(2); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["B", "C"]);
        });
        it('Plain Get List StartIndex, endIndex', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest", 1, 1); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(1); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["B"]);
        });
        it('Plain Get List only endIndex', async function () {
            let storage = new RedisHandler_1.RedisHandler(redisConnObj);
            let result = await storage.rightPush(keyPrefix + "PushTest", ["A", "B", "C"], 10); //1 second
            let resulttoCheck = await storage.getList(keyPrefix + "PushTest", undefined, 1); //1 second
            let del = await storage.delete(keyPrefix + "PushTest");
            chai_1.expect(resulttoCheck.length).equal(2); //should be null. key should not exist.
            chai_1.expect(resulttoCheck).to.have.ordered.members(["A", "B"]);
        });
    });
});
/*
   describe('#peek()', function ()
   {
       it('fails when the queue is empty', async function ()
       {
           let storage: IStorageHandler = new MemoryStorage()
           var queue = new DistributedQueue(queuename, storage);

           expectThrowsAsync(queue.peek, [], 'DistributedQueue is empty');
           expectThrowsAsync(queue.peek, [], 'DistributedQueue is empty');
           await queue.enq('jano');

       });

       it('returns the top element of the queue', async function ()
       {
           let storage: IStorageHandler = new MemoryStorage()
           var queue = new DistributedQueue(queuename, storage);
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
*/
//# sourceMappingURL=redisstorage.test.js.map