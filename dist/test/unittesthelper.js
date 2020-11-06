"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.msleep = exports.expectThrowsAsync = void 0;
const chai_1 = require("chai");
/**
 * Takes in a function and checks for error
 * https://medium.com/srmkzilla/typescript-error-handling-with-asynchronous-function-in-chai-7fc8e2824cf3
 * @param {Function} method - The function to check
 * @param {any[]} params - The array of function parameters
 * @param {string} message - Optional message to match with error message
 */
exports.expectThrowsAsync = async (method, params, message) => {
    let err = null;
    try {
        await method(...params);
    }
    catch (error) {
        err = error;
    }
    if (message) {
        chai_1.expect(err.message).to.be.equal(message);
    }
    else {
        chai_1.expect(err).to.be.an("Error");
    }
};
function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
exports.msleep = msleep;
function sleep(n) {
    msleep(n * 1000);
}
exports.sleep = sleep;
//# sourceMappingURL=unittesthelper.js.map