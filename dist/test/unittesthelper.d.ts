/**
 * Takes in a function and checks for error
 * https://medium.com/srmkzilla/typescript-error-handling-with-asynchronous-function-in-chai-7fc8e2824cf3
 * @param {Function} method - The function to check
 * @param {any[]} params - The array of function parameters
 * @param {string} message - Optional message to match with error message
 */
export declare const expectThrowsAsync: (method: Function, params: any[], message?: string | undefined) => Promise<void>;
export declare function msleep(n: any): void;
export declare function sleep(n: any): void;
