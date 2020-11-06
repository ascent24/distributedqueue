import { expect } from "chai";

/**
 * Takes in a function and checks for error
 * https://medium.com/srmkzilla/typescript-error-handling-with-asynchronous-function-in-chai-7fc8e2824cf3
 * @param {Function} method - The function to check
 * @param {any[]} params - The array of function parameters
 * @param {string} message - Optional message to match with error message
 */
export const expectThrowsAsync = async (
    method: Function,
    params: any[],
    message?: string
) =>
{
    let err: any = null;
    try
    {
        await method(...params);
    } catch (error)
    {
        err = error;
    }
    if (message)
    {
        expect(err.message).to.be.equal(message);
    } else
    {
        expect(err).to.be.an("Error");
    }
};

export function msleep(n)
{
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
export  function sleep(n)
{
    msleep(n * 1000);
}